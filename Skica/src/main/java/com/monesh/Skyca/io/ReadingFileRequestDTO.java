package com.monesh.Skyca.io;



import org.springframework.web.multipart.MultipartFile;

public class ReadingFileRequestDTO {
    private String title;
    private String category;
    private String description;
    private MultipartFile file;      // PDF
    private MultipartFile thumbnail; // Optional image

    public ReadingFileRequestDTO() {}

    // Getters & Setters
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public MultipartFile getFile() { return file; }
    public void setFile(MultipartFile file) { this.file = file; }

    public MultipartFile getThumbnail() { return thumbnail; }
    public void setThumbnail(MultipartFile thumbnail) { this.thumbnail = thumbnail; }
}
