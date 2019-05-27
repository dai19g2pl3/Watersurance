package com.dai.watersurance.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.dai.watersurance.model.Habitation;

public interface HabitationRepository extends JpaRepository<Habitation, Long>{

	<T> List<T> findAllByOrderByIdAsc(Class<T> type);
	
	<T> Optional<T> findById(Long id, Class<T> type);
	
	@Query("Select h FROM Habitation h WHERE h.user.id = :userId")
	Optional<List<Habitation>> findHabitationByUserId(@Param("userId") Long insurerId);
}
