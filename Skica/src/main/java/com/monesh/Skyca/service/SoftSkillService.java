package com.monesh.Skyca.service;

import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.monesh.Skyca.Exceptions.ResourceNotFoundException;
import com.monesh.Skyca.entity.SoftSkill;
import com.monesh.Skyca.io.SoftSkillResponseDTO;
import com.monesh.Skyca.repository.SoftSkillRepository;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class SoftSkillService {

    private final SoftSkillRepository repository;
    private final FileStorageService fileStorageService;

    public SoftSkillService(SoftSkillRepository repository, FileStorageService fileStorageService) {
        this.repository = repository;
        this.fileStorageService = fileStorageService;
    }

    public SoftSkillResponseDTO create(String name, String description, String usedIt,
                                       String example, String idioms, String exampleUsage,
                                       MultipartFile video) {
        SoftSkill s = new SoftSkill();
        s.setName(name);
        s.setDescription(description);
        s.setUsedIt(usedIt);
        s.setExample(example);
        s.setIdioms(idioms);
        s.setExampleUsage(exampleUsage);

        String videoFileName = fileStorageService.storeFile(video);
        s.setVideoFileName(videoFileName);

        SoftSkill saved = repository.save(s);
        return toDto(saved);
    }

    public List<SoftSkillResponseDTO> getAll() {
        return repository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    public SoftSkillResponseDTO getById(Long id) {
        SoftSkill s = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SoftSkill not found with id " + id));
        return toDto(s);
    }

    public Resource loadVideoResource(Long id) {
        SoftSkill s = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SoftSkill not found with id " + id));
        if (s.getVideoFileName() == null) {
            throw new ResourceNotFoundException("No video associated with SoftSkill id " + id);
        }
        return fileStorageService.loadFileAsResource(s.getVideoFileName());
    }

    public SoftSkillResponseDTO update(Long id, String name, String description, String usedIt,
                                       String example, String idioms, String exampleUsage,
                                       MultipartFile video) {
        SoftSkill s = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SoftSkill not found with id " + id));

        if (name != null) s.setName(name);
        if (description != null) s.setDescription(description);
        if (usedIt != null) s.setUsedIt(usedIt);
        if (example != null) s.setExample(example);
        if (idioms != null) s.setIdioms(idioms);
        if (exampleUsage != null) s.setExampleUsage(exampleUsage);

        if (video != null && !video.isEmpty()) {
            String filename = fileStorageService.storeFile(video);
            s.setVideoFileName(filename);
        }

        SoftSkill updated = repository.save(s);
        return toDto(updated);
    }

    public void delete(Long id) {
        SoftSkill s = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SoftSkill not found with id " + id));
        repository.delete(s);
        // optionally: delete file from disk - omitted for brevity
    }

    private SoftSkillResponseDTO toDto(SoftSkill s) {
        SoftSkillResponseDTO dto = new SoftSkillResponseDTO();
        dto.setId(s.getId());
        dto.setName(s.getName());
        dto.setDescription(s.getDescription());
        dto.setUsedIt(s.getUsedIt());
        dto.setExample(s.getExample());
        dto.setIdioms(s.getIdioms());
        dto.setExampleUsage(s.getExampleUsage());

        if (s.getVideoFileName() != null) {
            String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/softskills/")
                    .path(String.valueOf(s.getId()).trim())
                    .path("/video")
                    .toUriString();
            dto.setVideoUrl(fileDownloadUri);
        } else {
            dto.setVideoUrl(null);
        }
        return dto;
    }
}
