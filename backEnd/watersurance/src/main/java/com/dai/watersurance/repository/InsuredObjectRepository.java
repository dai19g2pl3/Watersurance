package com.dai.watersurance.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.dai.watersurance.model.InsuredObject;

public interface InsuredObjectRepository extends JpaRepository<InsuredObject, Long>{
	
	Boolean existsById(long id);
	
	@Query(value = "update insured_object io set io.occurrence_id = :idOccurrence, io.was_insured = 1 "
			+ "where io.id = :idInsuredObject", nativeQuery = true)
	@Modifying()
	@Transactional()
	void updateInsuredObjectAddOccurrence(@Param("idOccurrence") Long idOccurence,
			@Param("idInsuredObject") Long idInsuredObject); 
	
	@Query(value = "update insured_object io set io.occurrence_id = null, io.was_insured = 0 "
			+ "where io.id = :idInsuredObject", nativeQuery = true)
	@Modifying()
	@Transactional()
	void updateInsuredObjectRemoveOccurrence(@Param("idInsuredObject") Long idInsuredObject); 
	
}
