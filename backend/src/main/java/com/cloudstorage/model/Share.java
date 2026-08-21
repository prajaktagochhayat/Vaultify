package com.cloudstorage.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "shares")
public class Share {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "file_id")
    private FileItem fileItem;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "folder_id")
    private Folder folder;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shared_with_user_id", nullable = false)
    private User sharedWithUser;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ShareRole role;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by_id", nullable = false)
    private User createdBy;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public Share() {}

    public Share(Long id, FileItem fileItem, Folder folder, User sharedWithUser, ShareRole role, User createdBy) {
        this.id = id;
        this.fileItem = fileItem;
        this.folder = folder;
        this.sharedWithUser = sharedWithUser;
        this.role = role;
        this.createdBy = createdBy;
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public enum ShareRole {
        VIEWER, EDITOR
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public FileItem getFileItem() { return fileItem; }
    public void setFileItem(FileItem fileItem) { this.fileItem = fileItem; }

    public Folder getFolder() { return folder; }
    public void setFolder(Folder folder) { this.folder = folder; }

    public User getSharedWithUser() { return sharedWithUser; }
    public void setSharedWithUser(User sharedWithUser) { this.sharedWithUser = sharedWithUser; }

    public ShareRole getRole() { return role; }
    public void setRole(ShareRole role) { this.role = role; }

    public User getCreatedBy() { return createdBy; }
    public void setCreatedBy(User createdBy) { this.createdBy = createdBy; }

    public LocalDateTime getCreatedAt() { return createdAt; }

    // Builder
    public static ShareBuilder builder() { return new ShareBuilder(); }

    public static class ShareBuilder {
        private Long id;
        private FileItem fileItem;
        private Folder folder;
        private User sharedWithUser;
        private ShareRole role;
        private User createdBy;

        public ShareBuilder id(Long id) { this.id = id; return this; }
        public ShareBuilder fileItem(FileItem fileItem) { this.fileItem = fileItem; return this; }
        public ShareBuilder folder(Folder folder) { this.folder = folder; return this; }
        public ShareBuilder sharedWithUser(User sharedWithUser) { this.sharedWithUser = sharedWithUser; return this; }
        public ShareBuilder role(ShareRole role) { this.role = role; return this; }
        public ShareBuilder createdBy(User createdBy) { this.createdBy = createdBy; return this; }

        public Share build() {
            return new Share(id, fileItem, folder, sharedWithUser, role, createdBy);
        }
    }
}
