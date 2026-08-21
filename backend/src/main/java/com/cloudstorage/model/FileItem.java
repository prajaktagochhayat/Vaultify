package com.cloudstorage.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "files")
public class FileItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String originalName;

    private String mimeType;

    @Column(nullable = false)
    private Long size;

    @Column(nullable = false)
    private String storagePath;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "folder_id")
    private Folder folder;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    private Integer currentVersion = 1;

    private boolean isTrashed = false;

    private LocalDateTime trashedAt;

    private boolean isStarred = false;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    public FileItem() {}

    public FileItem(Long id, String name, String originalName, String mimeType, Long size, String storagePath, Folder folder, User owner, Integer currentVersion, boolean isTrashed, LocalDateTime trashedAt, boolean isStarred) {
        this.id = id;
        this.name = name;
        this.originalName = originalName;
        this.mimeType = mimeType;
        this.size = size;
        this.storagePath = storagePath;
        this.folder = folder;
        this.owner = owner;
        if (currentVersion != null) this.currentVersion = currentVersion;
        this.isTrashed = isTrashed;
        this.trashedAt = trashedAt;
        this.isStarred = isStarred;
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getOriginalName() { return originalName; }
    public void setOriginalName(String originalName) { this.originalName = originalName; }

    public String getMimeType() { return mimeType; }
    public void setMimeType(String mimeType) { this.mimeType = mimeType; }

    public Long getSize() { return size; }
    public void setSize(Long size) { this.size = size; }

    public String getStoragePath() { return storagePath; }
    public void setStoragePath(String storagePath) { this.storagePath = storagePath; }

    public Folder getFolder() { return folder; }
    public void setFolder(Folder folder) { this.folder = folder; }

    public User getOwner() { return owner; }
    public void setOwner(User owner) { this.owner = owner; }

    public Integer getCurrentVersion() { return currentVersion; }
    public void setCurrentVersion(Integer currentVersion) { this.currentVersion = currentVersion; }

    public boolean isTrashed() { return isTrashed; }
    public void setTrashed(boolean trashed) { isTrashed = trashed; }

    public LocalDateTime getTrashedAt() { return trashedAt; }
    public void setTrashedAt(LocalDateTime trashedAt) { this.trashedAt = trashedAt; }

    public boolean isStarred() { return isStarred; }
    public void setStarred(boolean starred) { isStarred = starred; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }

    // Builder
    public static FileItemBuilder builder() { return new FileItemBuilder(); }

    public static class FileItemBuilder {
        private Long id;
        private String name;
        private String originalName;
        private String mimeType;
        private Long size;
        private String storagePath;
        private Folder folder;
        private User owner;
        private Integer currentVersion = 1;
        private boolean isTrashed = false;
        private LocalDateTime trashedAt;
        private boolean isStarred = false;

        public FileItemBuilder id(Long id) { this.id = id; return this; }
        public FileItemBuilder name(String name) { this.name = name; return this; }
        public FileItemBuilder originalName(String originalName) { this.originalName = originalName; return this; }
        public FileItemBuilder mimeType(String mimeType) { this.mimeType = mimeType; return this; }
        public FileItemBuilder size(Long size) { this.size = size; return this; }
        public FileItemBuilder storagePath(String storagePath) { this.storagePath = storagePath; return this; }
        public FileItemBuilder folder(Folder folder) { this.folder = folder; return this; }
        public FileItemBuilder owner(User owner) { this.owner = owner; return this; }
        public FileItemBuilder currentVersion(Integer currentVersion) { this.currentVersion = currentVersion; return this; }
        public FileItemBuilder isTrashed(boolean isTrashed) { this.isTrashed = isTrashed; return this; }
        public FileItemBuilder trashedAt(LocalDateTime trashedAt) { this.trashedAt = trashedAt; return this; }
        public FileItemBuilder isStarred(boolean isStarred) { this.isStarred = isStarred; return this; }

        public FileItem build() {
            return new FileItem(id, name, originalName, mimeType, size, storagePath, folder, owner, currentVersion, isTrashed, trashedAt, isStarred);
        }
    }
}
