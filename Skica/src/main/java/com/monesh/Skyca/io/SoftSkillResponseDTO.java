package com.monesh.Skyca.io;


public class SoftSkillResponseDTO {
    private Long id;
    private String name;
    private String description;
    private String usedIt;
    private String example;
    private String idioms;
    private String exampleUsage;
    private String videoUrl; // URL to download/serve video

    public SoftSkillResponseDTO() {}

    // getters & setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getUsedIt() { return usedIt; }
    public void setUsedIt(String usedIt) { this.usedIt = usedIt; }

    public String getExample() { return example; }
    public void setExample(String example) { this.example = example; }

    public String getIdioms() { return idioms; }
    public void setIdioms(String idioms) { this.idioms = idioms; }

    public String getExampleUsage() { return exampleUsage; }
    public void setExampleUsage(String exampleUsage) { this.exampleUsage = exampleUsage; }

    public String getVideoUrl() { return videoUrl; }
    public void setVideoUrl(String videoUrl) { this.videoUrl = videoUrl; }
}
