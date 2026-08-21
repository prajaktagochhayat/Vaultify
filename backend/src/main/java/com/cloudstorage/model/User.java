package com.cloudstorage.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String fullName;

    private String avatarUrl;

    private Long storageQuota = 5368709120L; // 5 GB default

    private Long storageUsed = 0L;

    @Enumerated(EnumType.STRING)
    private Role role = Role.USER;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    public User() {}

    public User(Long id, String email, String password, String fullName, String avatarUrl, Long storageQuota, Long storageUsed, Role role) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.fullName = fullName;
        this.avatarUrl = avatarUrl;
        if (storageQuota != null) this.storageQuota = storageQuota;
        if (storageUsed != null) this.storageUsed = storageUsed;
        if (role != null) this.role = role;
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

    public enum Role {
        USER, ADMIN
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }

    public Long getStorageQuota() { return storageQuota; }
    public void setStorageQuota(Long storageQuota) { this.storageQuota = storageQuota; }

    public Long getStorageUsed() { return storageUsed; }
    public void setStorageUsed(Long storageUsed) { this.storageUsed = storageUsed; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }

    // Builder
    public static UserBuilder builder() { return new UserBuilder(); }

    public static class UserBuilder {
        private Long id;
        private String email;
        private String password;
        private String fullName;
        private String avatarUrl;
        private Long storageQuota = 5368709120L;
        private Long storageUsed = 0L;
        private Role role = Role.USER;

        public UserBuilder id(Long id) { this.id = id; return this; }
        public UserBuilder email(String email) { this.email = email; return this; }
        public UserBuilder password(String password) { this.password = password; return this; }
        public UserBuilder fullName(String fullName) { this.fullName = fullName; return this; }
        public UserBuilder avatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; return this; }
        public UserBuilder storageQuota(Long storageQuota) { this.storageQuota = storageQuota; return this; }
        public UserBuilder storageUsed(Long storageUsed) { this.storageUsed = storageUsed; return this; }
        public UserBuilder role(Role role) { this.role = role; return this; }

        public User build() {
            return new User(id, email, password, fullName, avatarUrl, storageQuota, storageUsed, role);
        }
    }
}
