package com.cloudstorage.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "stars")
public class Star {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "file_id")
    private FileItem fileItem;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "folder_id")
    private Folder folder;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public Star() {}

    public Star(Long id, User user, FileItem fileItem, Folder folder) {
        this.id = id;
        this.user = user;
        this.fileItem = fileItem;
        this.folder = folder;
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public FileItem getFileItem() { return fileItem; }
    public void setFileItem(FileItem fileItem) { this.fileItem = fileItem; }

    public Folder getFolder() { return folder; }
    public void setFolder(Folder folder) { this.folder = folder; }

    public LocalDateTime getCreatedAt() { return createdAt; }

    // Builder
    public static StarBuilder builder() { return new StarBuilder(); }

    public static class StarBuilder {
        private Long id;
        private User user;
        private FileItem fileItem;
        private Folder folder;

        public StarBuilder id(Long id) { this.id = id; return this; }
        public StarBuilder user(User user) { this.user = user; return this; }
        public StarBuilder fileItem(FileItem fileItem) { this.fileItem = fileItem; return this; }
        public StarBuilder folder(Folder folder) { this.folder = folder; return this; }

        public Star build() {
            return new Star(id, user, fileItem, folder);
        }
    }
}
