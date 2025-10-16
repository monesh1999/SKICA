package com.monesh.Skyca.controller;


import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.monesh.Skyca.io.SoftSkillResponseDTO;
import com.monesh.Skyca.service.SoftSkillService;

import java.util.List;

@RestController
@RequestMapping("/softskills")
public class SoftSkillController {

    private final SoftSkillService service;

    public SoftSkillController(SoftSkillService service) {
        this.service = service;
    }

    // CREATE: multipart/form-data
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<SoftSkillResponseDTO> create(
            @RequestParam("name") String name,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "usedIt", required = false) String usedIt,
            @RequestParam(value = "example", required = false) String example,
            @RequestParam(value = "idioms", required = false) String idioms,
            @RequestParam(value = "exampleUsage", required = false) String exampleUsage,
            @RequestParam(value = "video", required = false) MultipartFile video
    ) {
        SoftSkillResponseDTO dto = service.create(name, description, usedIt, example, idioms, exampleUsage, video);
        return new ResponseEntity<>(dto, HttpStatus.CREATED);
    }

    // READ all
    @GetMapping
    public ResponseEntity<List<SoftSkillResponseDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    // READ by id
    @GetMapping("/{id}")
    public ResponseEntity<SoftSkillResponseDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    // DOWNLOAD video file
    @GetMapping("/{id}/video")
    public ResponseEntity<Resource> downloadVideo(@PathVariable Long id) {
        Resource resource = service.loadVideoResource(id);

        String filename = resource.getFilename();
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"");

        MediaType contentType = MediaType.APPLICATION_OCTET_STREAM;
        return ResponseEntity.ok()
                .contentType(contentType)
                .headers(headers)
                .body(resource);
    }

    // UPDATE - multipart/form-data (video optional)
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<SoftSkillResponseDTO> update(
            @PathVariable Long id,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "usedIt", required = false) String usedIt,
            @RequestParam(value = "example", required = false) String example,
            @RequestParam(value = "idioms", required = false) String idioms,
            @RequestParam(value = "exampleUsage", required = false) String exampleUsage,
            @RequestParam(value = "video", required = false) MultipartFile video
    ) {
        SoftSkillResponseDTO dto = service.update(id, name, description, usedIt, example, idioms, exampleUsage, video);
        return ResponseEntity.ok(dto);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
