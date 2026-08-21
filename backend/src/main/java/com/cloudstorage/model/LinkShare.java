package com.cloudstorage.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "link_shares")
public class LinkShare {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String token;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "file_id")
    private FileItem fileItem;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "folder_id")
    private Folder folder;

    private LocalDateTime expiresAt;

    private String passwordHash;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Share.ShareRole role = Share.ShareRole.VIEWER;

    private Integer accessCount = 0;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by_id", nullable = false)
    private User createdBy;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public LinkShare() {}

    public LinkShare(Long id, String token, FileItem fileItem, Folder folder, LocalDateTime expiresAt, String passwordHash, Share.ShareRole role, Integer accessCount, User createdBy) {
        this.id = id;
        this.token = token;
        this.fileItem = fileItem;
        this.folder = folder;
        this.expiresAt = expiresAt;
        this.passwordHash = passwordHash;
        if (role != null) this.role = role;
        if (accessCount != null) this.accessCount = accessCount;
        this.createdBy = createdBy;
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public FileItem getFileItem() { return fileItem; }
    public void setFileItem(FileItem fileItem) { this.fileItem = fileItem; }

    public Folder getFolder() { return folder; }
    public void setFolder(Folder folder) { this.folder = folder; }

    public LocalDateTime getExpiresAt() { return expiresAt; }
    public void setExpiresAt(LocalDateTime expiresAt) { this.expiresAt = expiresAt; }

    public String getPasswordHash() { return passwordHash; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }

    public Share.ShareRole getRole() { return role; }
    public void setRole(Share.ShareRole role) { this.role = role; }

    public Integer getAccessCount() { return accessCount; }
    public void setAccessCount(Integer accessCount) { this.accessCount = accessCount; }

    public User getCreatedBy() { return createdBy; }
    public void setCreatedBy(User createdBy) { this.createdBy = createdBy; }

    public LocalDateTime getCreatedAt() { return createdAt; }

    // Builder
    public static LinkShareBuilder builder() { return new LinkShareBuilder(); }

    public static class LinkShareBuilder {
        private Long id;
        private String token;
        private FileItem fileItem;
        private Folder folder;
        private LocalDateTime expiresAt;
        private String passwordHash;
        private Share.ShareRole role = Share.ShareRole.VIEWER;
        private Integer accessCount = 0;
        private User createdBy;

        public LinkShareBuilder id(Long id) { this.id = id; return this; }
        public LinkShareBuilder token(String token) { this.token = token; return this; }
        public LinkShareBuilder fileItem(FileItem fileItem) { this.fileItem = fileItem; return this; }
        public LinkShareBuilder folder(Folder folder) { this.folder = folder; return this; }
        public LinkShareBuilder expiresAt(LocalDateTime expiresAt) { this.expiresAt = expiresAt; return this; }
        public LinkShareBuilder passwordHash(String passwordHash) { this.passwordHash = passwordHash; return this; }
        public LinkShareBuilder role(Share.ShareRole role) { this.role = role; return this; }
        public LinkShareBuilder accessCount(Integer accessCount) { this.accessCount = accessCount; return this; }
        public LinkShareBuilder createdBy(User createdBy) { this.createdBy = createdBy; return this; }

        public LinkShare build() {
            return new LinkShare(id, token, fileItem, folder, expiresAt, passwordHash, role, accessCount, createdBy);
        }
    }
}
