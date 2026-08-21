package com.cloudstorage.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "file_versions")
public class FileVersion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "file_id", nullable = false)
    private FileItem fileItem;

    @Column(nullable = false)
    private Integer versionNumber;

    @Column(nullable = false)
    private String storagePath;

    @Column(nullable = false)
    private Long size;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by_id", nullable = false)
    private User createdBy;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public FileVersion() {}

    public FileVersion(Long id, FileItem fileItem, Integer versionNumber, String storagePath, Long size, User createdBy) {
        this.id = id;
        this.fileItem = fileItem;
        this.versionNumber = versionNumber;
        this.storagePath = storagePath;
        this.size = size;
        this.createdBy = createdBy;
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public FileItem getFileItem() { return fileItem; }
    public void setFileItem(FileItem fileItem) { this.fileItem = fileItem; }

    public Integer getVersionNumber() { return versionNumber; }
    public void setVersionNumber(Integer versionNumber) { this.versionNumber = versionNumber; }

    public String getStoragePath() { return storagePath; }
    public void setStoragePath(String storagePath) { this.storagePath = storagePath; }

    public Long getSize() { return size; }
    public void setSize(Long size) { this.size = size; }

    public User getCreatedBy() { return createdBy; }
    public void setCreatedBy(User createdBy) { this.createdBy = createdBy; }

    public LocalDateTime getCreatedAt() { return createdAt; }

    // Builder
    public static FileVersionBuilder builder() { return new FileVersionBuilder(); }

    public static class FileVersionBuilder {
        private Long id;
        private FileItem fileItem;
        private Integer versionNumber;
        private String storagePath;
        private Long size;
        private User createdBy;

        public FileVersionBuilder id(Long id) { this.id = id; return this; }
        public FileVersionBuilder fileItem(FileItem fileItem) { this.fileItem = fileItem; return this; }
        public FileVersionBuilder versionNumber(Integer versionNumber) { this.versionNumber = versionNumber; return this; }
        public FileVersionBuilder storagePath(String storagePath) { this.storagePath = storagePath; return this; }
        public FileVersionBuilder size(Long size) { this.size = size; return this; }
        public FileVersionBuilder createdBy(User createdBy) { this.createdBy = createdBy; return this; }

        public FileVersion build() {
            return new FileVersion(id, fileItem, versionNumber, storagePath, size, createdBy);
        }
    }
}
