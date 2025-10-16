package com.monesh.Skyca.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.monesh.Skyca.entity.SoftSkill;

@Repository
public interface SoftSkillRepository extends JpaRepository<SoftSkill, Long> {
}
