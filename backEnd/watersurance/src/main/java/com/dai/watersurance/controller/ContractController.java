package com.dai.watersurance.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.dai.watersurance.payload.response.ApiResponse;
import com.dai.watersurance.service.ContractService;

@RestController
@RequestMapping("/api")
public class ContractController {
	
	@Autowired
    private ContractService contractService;
	
	@PreAuthorize("hasRole('INSURER') or hasRole('ADMIN')")
	@GetMapping("/contract/{id}")
    public ResponseEntity<Resource> getContract(@PathVariable(value = "id") long id) {
    	return contractService.getContract(id);
    }
	
	@PreAuthorize("hasRole('USER')")
	@GetMapping("/my/contract/{id}")
    public ResponseEntity<Resource> getMyContract(@PathVariable(value = "id") long id) {
    	return contractService.getContract(id);
    }
	
	
	@PreAuthorize("hasRole('INSURER') or hasRole('ADMIN')")
	@PostMapping("/contract/{id}")
    public ResponseEntity<ApiResponse> registerContract(@PathVariable(value = "id") long id,
    		@RequestParam("file") MultipartFile file) {
    	return contractService.registerContract(id, file);
    }
	
	@PreAuthorize("hasRole('INSURER') or hasRole('ADMIN')")
	@PutMapping("/contract/{id}")
    public ResponseEntity<ApiResponse> updateContract(@PathVariable(value = "id") long id,
    		@RequestParam("file") MultipartFile file) {
    	return contractService.updateContract(id, file);
    }
	
	@PreAuthorize("hasRole('INSURER') or hasRole('ADMIN')")
	@DeleteMapping("/contract/{id}")
	public ResponseEntity<ApiResponse> deleteContract(@PathVariable(value = "id") long id) {
    	return contractService.deleteContract(id);
    }
}
