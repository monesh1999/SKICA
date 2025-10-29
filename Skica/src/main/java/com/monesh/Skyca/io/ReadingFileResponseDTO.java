package com.monesh.Skyca.io;


import java.time.LocalDateTime;

public class ReadingFileResponseDTO {
    private Long id;
    private String title;
    private String category;
    private String fileUrl;
    private String thumbnailUrl; // optional
    private LocalDateTime uploadTime;

    public ReadingFileResponseDTO() {}

    public ReadingFileResponseDTO(Long id, String title, String category, String fileUrl, String thumbnailUrl, LocalDateTime uploadTime) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.fileUrl = fileUrl;
        this.thumbnailUrl = thumbnailUrl;
        this.uploadTime = uploadTime;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getFileUrl() { return fileUrl; }
    public void setFileUrl(String fileUrl) { this.fileUrl = fileUrl; }

    public String getThumbnailUrl() { return thumbnailUrl; }
    public void setThumbnailUrl(String thumbnailUrl) { this.thumbnailUrl = thumbnailUrl; }

    public LocalDateTime getUploadTime() { return uploadTime; }
    public void setUploadTime(LocalDateTime uploadTime) { this.uploadTime = uploadTime; }
}
