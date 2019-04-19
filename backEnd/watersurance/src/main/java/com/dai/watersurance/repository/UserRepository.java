package com.dai.watersurance.repository;

import com.dai.watersurance.model.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    List<User> findByIdIn(List<Long> userIds);
    
    <T> Optional<T> findById(Long id, Class<T> type);

    Boolean existsByEmail(String email);
}