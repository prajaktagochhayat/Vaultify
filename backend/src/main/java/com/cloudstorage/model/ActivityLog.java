package com.cloudstorage.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "activities")
public class ActivityLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ActionType action;

    private String targetType; // FILE or FOLDER
    private Long targetId;
    private String targetName;
    private String details;

    @Column(nullable = false, updatable = false)
    private LocalDateTime timestamp;

    public ActivityLog() {}

    public ActivityLog(Long id, User user, ActionType action, String targetType, Long targetId, String targetName, String details) {
        this.id = id;
        this.user = user;
        this.action = action;
        this.targetType = targetType;
        this.targetId = targetId;
        this.targetName = targetName;
        this.details = details;
    }

    @PrePersist
    protected void onCreate() {
        timestamp = LocalDateTime.now();
    }

    public enum ActionType {
        UPLOAD, DOWNLOAD, VIEW, CREATE_FOLDER, RENAME, MOVE, TRASH, RESTORE, DELETE_PERMANENT, SHARE, STAR, UNSTAR
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public ActionType getAction() { return action; }
    public void setAction(ActionType action) { this.action = action; }

    public String getTargetType() { return targetType; }
    public void setTargetType(String targetType) { this.targetType = targetType; }

    public Long getTargetId() { return targetId; }
    public void setTargetId(Long targetId) { this.targetId = targetId; }

    public String getTargetName() { return targetName; }
    public void setTargetName(String targetName) { this.targetName = targetName; }

    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }

    public LocalDateTime getTimestamp() { return timestamp; }

    // Builder
    public static ActivityLogBuilder builder() { return new ActivityLogBuilder(); }

    public static class ActivityLogBuilder {
        private Long id;
        private User user;
        private ActionType action;
        private String targetType;
        private Long targetId;
        private String targetName;
        private String details;

        public ActivityLogBuilder id(Long id) { this.id = id; return this; }
        public ActivityLogBuilder user(User user) { this.user = user; return this; }
        public ActivityLogBuilder action(ActionType action) { this.action = action; return this; }
        public ActivityLogBuilder targetType(String targetType) { this.targetType = targetType; return this; }
        public ActivityLogBuilder targetId(Long targetId) { this.targetId = targetId; return this; }
        public ActivityLogBuilder targetName(String targetName) { this.targetName = targetName; return this; }
        public ActivityLogBuilder details(String details) { this.details = details; return this; }

        public ActivityLog build() {
            return new ActivityLog(id, user, action, targetType, targetId, targetName, details);
        }
    }
}
