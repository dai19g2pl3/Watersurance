package com.dai.watersurance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dai.watersurance.model.Contract;

public interface ContractRepository extends JpaRepository<Contract, Long>{

}
