package com.cloudstorage.dto;

import java.time.LocalDateTime;

public class ActivityDtos {

    public static class ActivityDto {
        private Long id;
        private String userFullName;
        private String userEmail;
        private String action;
        private String targetType;
        private Long targetId;
        private String targetName;
        private String details;
        private LocalDateTime timestamp;

        public ActivityDto() {}
        public ActivityDto(Long id, String userFullName, String userEmail, String action, String targetType, Long targetId, String targetName, String details, LocalDateTime timestamp) {
            this.id = id;
            this.userFullName = userFullName;
            this.userEmail = userEmail;
            this.action = action;
            this.targetType = targetType;
            this.targetId = targetId;
            this.targetName = targetName;
            this.details = details;
            this.timestamp = timestamp;
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getUserFullName() { return userFullName; }
        public void setUserFullName(String userFullName) { this.userFullName = userFullName; }
        public String getUserEmail() { return userEmail; }
        public void setUserEmail(String userEmail) { this.userEmail = userEmail; }
        public String getAction() { return action; }
        public void setAction(String action) { this.action = action; }
        public String getTargetType() { return targetType; }
        public void setTargetType(String targetType) { this.targetType = targetType; }
        public Long getTargetId() { return targetId; }
        public void setTargetId(Long targetId) { this.targetId = targetId; }
        public String getTargetName() { return targetName; }
        public void setTargetName(String targetName) { this.targetName = targetName; }
        public String getDetails() { return details; }
        public void setDetails(String details) { this.details = details; }
        public LocalDateTime getTimestamp() { return timestamp; }
        public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }

        public static ActivityDtoBuilder builder() { return new ActivityDtoBuilder(); }
        public static class ActivityDtoBuilder {
            private Long id;
            private String userFullName;
            private String userEmail;
            private String action;
            private String targetType;
            private Long targetId;
            private String targetName;
            private String details;
            private LocalDateTime timestamp;

            public ActivityDtoBuilder id(Long id) { this.id = id; return this; }
            public ActivityDtoBuilder userFullName(String userFullName) { this.userFullName = userFullName; return this; }
            public ActivityDtoBuilder userEmail(String userEmail) { this.userEmail = userEmail; return this; }
            public ActivityDtoBuilder action(String action) { this.action = action; return this; }
            public ActivityDtoBuilder targetType(String targetType) { this.targetType = targetType; return this; }
            public ActivityDtoBuilder targetId(Long targetId) { this.targetId = targetId; return this; }
            public ActivityDtoBuilder targetName(String targetName) { this.targetName = targetName; return this; }
            public ActivityDtoBuilder details(String details) { this.details = details; return this; }
            public ActivityDtoBuilder timestamp(LocalDateTime timestamp) { this.timestamp = timestamp; return this; }

            public ActivityDto build() {
                return new ActivityDto(id, userFullName, userEmail, action, targetType, targetId, targetName, details, timestamp);
            }
        }
    }
}
