package com.monesh.Skyca.service;

import com.monesh.Skyca.entity.ReadingFile;
import com.monesh.Skyca.io.ReadingFileResponseDTO;
import com.monesh.Skyca.repository.ReadingFileRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReadingFileService {

    private final ReadingFileRepository repository;

    public ReadingFileService(ReadingFileRepository repository) {
        this.repository = repository;
    }

    public ReadingFile save(ReadingFile file) {
        return repository.save(file);
    }

    public List<ReadingFileResponseDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    public Optional<ReadingFileResponseDTO> getById(Long id) {
        return repository.findById(id).map(this::mapToDTO);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    public ReadingFileResponseDTO mapToDTO(ReadingFile file) {
        String baseUrl = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();

        ReadingFileResponseDTO dto = new ReadingFileResponseDTO();
        dto.setId(file.getId());
        dto.setTitle(file.getTitle());
        dto.setCategory(file.getCategory());
        dto.setUploadTime(file.getUploadTime());
        dto.setFileUrl(baseUrl + "/uploads/reading/" + file.getFileName());

        if (file.getThumbnailFileName() != null)
            dto.setThumbnailUrl(baseUrl + "/uploads/reading/thumbnails/" + file.getThumbnailFileName());

        return dto;
    }
}
