package com.dai.watersurance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dai.watersurance.model.Occurrence;

public interface OccurrenceRepository extends JpaRepository<Occurrence, Long> {

}
