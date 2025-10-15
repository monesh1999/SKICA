package com.monesh.Skyca.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.monesh.Skyca.entity.UserEntity;


public interface UserRepo extends JpaRepository<UserEntity,Long> {
	Optional<UserEntity> findByEmail(String email);
	Boolean existsByEmail(String email);
	Optional<UserEntity> findByUserId(String email);

}
