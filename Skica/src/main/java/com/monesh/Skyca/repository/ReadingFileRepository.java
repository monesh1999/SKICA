package com.monesh.Skyca.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.monesh.Skyca.entity.ReadingFile;

import java.util.List;

public interface ReadingFileRepository extends JpaRepository<ReadingFile, Long> {
	List<ReadingFile> findByCategory(String category);
    Page<ReadingFile> findAll(Pageable pageable);
}
