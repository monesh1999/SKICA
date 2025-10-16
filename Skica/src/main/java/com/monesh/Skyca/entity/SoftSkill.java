package com.monesh.Skyca.entity;


import jakarta.persistence.*;

@Entity
@Table(name = "soft_skills")
public class SoftSkill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    // store filename (not binary) on DB; file saved in filesystem folder configured
    private String videoFileName;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String usedIt;        // flexible field to describe where/how it's used

    @Column(columnDefinition = "TEXT")
    private String example;

    @Column(columnDefinition = "TEXT")
    private String idioms;

    @Column(columnDefinition = "TEXT")
    private String exampleUsage;  // interpreted "example make"

    // constructors, getters, setters
    public SoftSkill() {}

    // getters & setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getVideoFileName() { return videoFileName; }
    public void setVideoFileName(String videoFileName) { this.videoFileName = videoFileName; }

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
}
