package com.monesh.Skyca.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "file")
public class FileStorageProperties {

    private String uploadDir;
    private String readingUploadDir;

    public String getUploadDir() {
        return uploadDir;
    }

    public void setUploadDir(String uploadDir) {
        this.uploadDir = uploadDir;
    }

    public String getReadingUploadDir() {
        return readingUploadDir;
    }

    public void setReadingUploadDir(String readingUploadDir) {
        this.readingUploadDir = readingUploadDir;
    }
}
