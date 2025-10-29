package com.monesh.Skyca.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reading_files")
public class ReadingFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String category;

    @Column(length = 1000) // optional, allows long descriptions
    private String description;

    private String fileName;

    private String thumbnailFileName;

    private LocalDateTime uploadTime;

    public ReadingFile() {}

    public ReadingFile(String title, String category, String fileName, LocalDateTime uploadTime) {
        this.title = title;
        this.category = category;
        this.fileName = fileName;
        this.uploadTime = uploadTime;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getFileName() { return fileName; }
    public void setFileName(String fileName) { this.fileName = fileName; }

    public String getThumbnailFileName() { return thumbnailFileName; }
    public void setThumbnailFileName(String thumbnailFileName) { this.thumbnailFileName = thumbnailFileName; }

    public LocalDateTime getUploadTime() { return uploadTime; }
    public void setUploadTime(LocalDateTime uploadTime) { this.uploadTime = uploadTime; }
}
