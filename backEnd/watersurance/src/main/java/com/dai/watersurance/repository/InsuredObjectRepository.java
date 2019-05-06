package com.dai.watersurance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dai.watersurance.model.InsuredObject;

public interface InsuredObjectRepository extends JpaRepository<InsuredObject, Long>{
	
}
