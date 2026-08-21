package com.cloudstorage.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "folders")
public class Folder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Folder parent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    private boolean isTrashed = false;

    private LocalDateTime trashedAt;

    private boolean isStarred = false;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    public Folder() {}

    public Folder(Long id, String name, Folder parent, User owner, boolean isTrashed, LocalDateTime trashedAt, boolean isStarred) {
        this.id = id;
        this.name = name;
        this.parent = parent;
        this.owner = owner;
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

    public Folder getParent() { return parent; }
    public void setParent(Folder parent) { this.parent = parent; }

    public User getOwner() { return owner; }
    public void setOwner(User owner) { this.owner = owner; }

    public boolean isTrashed() { return isTrashed; }
    public void setTrashed(boolean trashed) { isTrashed = trashed; }

    public LocalDateTime getTrashedAt() { return trashedAt; }
    public void setTrashedAt(LocalDateTime trashedAt) { this.trashedAt = trashedAt; }

    public boolean isStarred() { return isStarred; }
    public void setStarred(boolean starred) { isStarred = starred; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }

    // Builder
    public static FolderBuilder builder() { return new FolderBuilder(); }

    public static class FolderBuilder {
        private Long id;
        private String name;
        private Folder parent;
        private User owner;
        private boolean isTrashed = false;
        private LocalDateTime trashedAt;
        private boolean isStarred = false;

        public FolderBuilder id(Long id) { this.id = id; return this; }
        public FolderBuilder name(String name) { this.name = name; return this; }
        public FolderBuilder parent(Folder parent) { this.parent = parent; return this; }
        public FolderBuilder owner(User owner) { this.owner = owner; return this; }
        public FolderBuilder isTrashed(boolean isTrashed) { this.isTrashed = isTrashed; return this; }
        public FolderBuilder trashedAt(LocalDateTime trashedAt) { this.trashedAt = trashedAt; return this; }
        public FolderBuilder isStarred(boolean isStarred) { this.isStarred = isStarred; return this; }

        public Folder build() {
            return new Folder(id, name, parent, owner, isTrashed, trashedAt, isStarred);
        }
    }
}
