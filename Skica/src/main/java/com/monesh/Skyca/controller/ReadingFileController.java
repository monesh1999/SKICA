package com.monesh.Skyca.controller;

import com.monesh.Skyca.entity.ReadingFile;
import com.monesh.Skyca.io.ReadingFileRequestDTO;
import com.monesh.Skyca.io.ReadingFileResponseDTO;
import com.monesh.Skyca.service.ReadingFileService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/reading")
public class ReadingFileController {

    private final ReadingFileService service;

    @Value("${file.reading-upload-dir}")
    private String readuploadDir;

    @Value("${file.thumbnail-dir}")
    private String thumbnailDir;

    public ReadingFileController(ReadingFileService service) {
        this.service = service;
    }

    @PostMapping("/upload")
    public ResponseEntity<ReadingFileResponseDTO> uploadFile(@ModelAttribute ReadingFileRequestDTO dto) throws IOException {
        ReadingFile file = new ReadingFile();
        file.setTitle(dto.getTitle());
        file.setCategory(dto.getCategory());
        file.setDescription(dto.getDescription());
        file.setUploadTime(LocalDateTime.now());

        if (dto.getFile() != null && !dto.getFile().isEmpty()) {
            String fileName = StringUtils.cleanPath(dto.getFile().getOriginalFilename());
            Path filePath = Paths.get(readuploadDir, fileName);
            Files.createDirectories(filePath.getParent());
            dto.getFile().transferTo(filePath);
            file.setFileName(fileName);
        }

        if (dto.getThumbnail() != null && !dto.getThumbnail().isEmpty()) {
            String thumbName = StringUtils.cleanPath(dto.getThumbnail().getOriginalFilename());
            Path thumbPath = Paths.get(thumbnailDir, thumbName);
            Files.createDirectories(thumbPath.getParent());
            dto.getThumbnail().transferTo(thumbPath);
            file.setThumbnailFileName(thumbName);
        }

        ReadingFile saved = service.save(file);
        return ResponseEntity.ok(service.mapToDTO(saved));
    }

    @GetMapping("/list")
    public List<ReadingFileResponseDTO> getAll() {
        return service.getAll();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
