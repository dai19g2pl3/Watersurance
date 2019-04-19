package com.dai.watersurance.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dai.watersurance.model.Insurer;

public interface InsurerRepository extends JpaRepository<Insurer, Long>{

	Optional<Insurer> findByName(String name);
	
	Boolean existsByName(String name);
}
