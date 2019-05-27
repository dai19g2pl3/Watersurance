package com.dai.watersurance.service;


import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.dai.watersurance.exception.ResourceNotFoundException;
import com.dai.watersurance.model.Contract;
import com.dai.watersurance.model.DBFile;
import com.dai.watersurance.model.User;
import com.dai.watersurance.payload.response.ApiResponse;
import com.dai.watersurance.repository.ContractRepository;
import com.dai.watersurance.repository.UserRepository;
import com.dai.watersurance.security.CurrentUser;
import com.dai.watersurance.security.UserPrincipal;

@Service
public class ContractService {
	
	@Autowired
    private DBFileStorageService dbFileStorageService;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ContractRepository contractRepository;
	
	public ResponseEntity<Resource> getContract(@PathVariable(value = "id") long id) {
		Contract contract = contractRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Contract", "id", id));
		
		DBFile dbFile = dbFileStorageService.getFile(contract.getFiles().getId());
		
		return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(dbFile.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + dbFile.getFileName() + "\"")
                .body(new ByteArrayResource(dbFile.getData()));
    }
	
	public ResponseEntity<?> getMyContract(@PathVariable(value = "id") long id,
			@CurrentUser UserPrincipal currentUser) {
		User user = userRepository.findById(currentUser.getId())
				.orElseThrow(() -> new ResourceNotFoundException("User", "id", currentUser.getId()));
		
		Set<Contract> contracts = user.getContracts();
		
		if(!isMine(contracts, id)) {
			return new ResponseEntity<ApiResponse>(new ApiResponse(false, "This contract is not yours"),
					HttpStatus.UNAUTHORIZED);
		}
		
		Contract contract = contractRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Contract", "id", id));
		
		DBFile dbFile = dbFileStorageService.getFile(contract.getFiles().getId());
		
		return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(dbFile.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + dbFile.getFileName() + "\"")
                .body(new ByteArrayResource(dbFile.getData()));
    }
	
	public ResponseEntity<ApiResponse> registerContract(@PathVariable(value = "id") long id,
			@RequestParam("file") MultipartFile file) {
		DBFile dbFile = dbFileStorageService.storeFile(file);

		User user = userRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
				
		Contract contract = new Contract(dbFile, user);
        contractRepository.save(contract);
		
		return ResponseEntity.ok().body(new ApiResponse(true, "Contract registered succcessfully"));
    }
	
	public ResponseEntity<ApiResponse> updateContract(@PathVariable(value = "id") long id,
    		@RequestParam("file") MultipartFile file) {
		Contract contract = contractRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Contract", "id", id));
		
		dbFileStorageService.deleteFile(contract.getFiles());
		
		DBFile dbFile = dbFileStorageService.storeFile(file);
		contract.setFiles(dbFile);
		contractRepository.save(contract);
		
    	return ResponseEntity.ok().body(new ApiResponse(true, "Contract updated succcessfully"));
    }
	
	@PreAuthorize("hasRole('INSURER') or hasRole('ADMIN')")
	@DeleteMapping("/contract/{id}")
	public ResponseEntity<ApiResponse> deleteContract(@PathVariable(value = "id") long id) {
		Contract contract = contractRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Contract", "id", id));
		
		contractRepository.delete(contract);
		
		return ResponseEntity.ok().body(new ApiResponse(true, "Contract deleted succcessfully"));
    }
	
	private boolean isMine(Set<Contract> contracts, long id) {
		boolean isMine = false;

		for (Contract contract : contracts) {
			if (contract.getId() == id) {
				isMine = true;
			}
		}
		
		return isMine;
	}
}
