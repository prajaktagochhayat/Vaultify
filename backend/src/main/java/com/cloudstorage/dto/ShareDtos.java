package com.cloudstorage.dto;

import java.time.LocalDateTime;

public class ShareDtos {

    public static class ShareRequest {
        private Long fileId;
        private Long folderId;
        private String userEmail;
        private String role; // VIEWER or EDITOR

        public ShareRequest() {}
        public ShareRequest(Long fileId, Long folderId, String userEmail, String role) {
            this.fileId = fileId;
            this.folderId = folderId;
            this.userEmail = userEmail;
            this.role = role;
        }

        public Long getFileId() { return fileId; }
        public void setFileId(Long fileId) { this.fileId = fileId; }
        public Long getFolderId() { return folderId; }
        public void setFolderId(Long folderId) { this.folderId = folderId; }
        public String getUserEmail() { return userEmail; }
        public void setUserEmail(String userEmail) { this.userEmail = userEmail; }
        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }
    }

    public static class ShareDto {
        private Long id;
        private Long fileId;
        private String fileName;
        private Long folderId;
        private String folderName;
        private String itemType;
        private String sharedWithEmail;
        private String sharedWithFullName;
        private String role;
        private String createdByEmail;
        private LocalDateTime createdAt;

        public ShareDto() {}
        public ShareDto(Long id, Long fileId, String fileName, Long folderId, String folderName, String itemType, String sharedWithEmail, String sharedWithFullName, String role, String createdByEmail, LocalDateTime createdAt) {
            this.id = id;
            this.fileId = fileId;
            this.fileName = fileName;
            this.folderId = folderId;
            this.folderName = folderName;
            this.itemType = itemType;
            this.sharedWithEmail = sharedWithEmail;
            this.sharedWithFullName = sharedWithFullName;
            this.role = role;
            this.createdByEmail = createdByEmail;
            this.createdAt = createdAt;
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public Long getFileId() { return fileId; }
        public void setFileId(Long fileId) { this.fileId = fileId; }
        public String getFileName() { return fileName; }
        public void setFileName(String fileName) { this.fileName = fileName; }
        public Long getFolderId() { return folderId; }
        public void setFolderId(Long folderId) { this.folderId = folderId; }
        public String getFolderName() { return folderName; }
        public void setFolderName(String folderName) { this.folderName = folderName; }
        public String getItemType() { return itemType; }
        public void setItemType(String itemType) { this.itemType = itemType; }
        public String getSharedWithEmail() { return sharedWithEmail; }
        public void setSharedWithEmail(String sharedWithEmail) { this.sharedWithEmail = sharedWithEmail; }
        public String getSharedWithFullName() { return sharedWithFullName; }
        public void setSharedWithFullName(String sharedWithFullName) { this.sharedWithFullName = sharedWithFullName; }
        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }
        public String getCreatedByEmail() { return createdByEmail; }
        public void setCreatedByEmail(String createdByEmail) { this.createdByEmail = createdByEmail; }
        public LocalDateTime getCreatedAt() { return createdAt; }
        public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

        public static ShareDtoBuilder builder() { return new ShareDtoBuilder(); }
        public static class ShareDtoBuilder {
            private Long id;
            private Long fileId;
            private String fileName;
            private Long folderId;
            private String folderName;
            private String itemType;
            private String sharedWithEmail;
            private String sharedWithFullName;
            private String role;
            private String createdByEmail;
            private LocalDateTime createdAt;

            public ShareDtoBuilder id(Long id) { this.id = id; return this; }
            public ShareDtoBuilder fileId(Long fileId) { this.fileId = fileId; return this; }
            public ShareDtoBuilder fileName(String fileName) { this.fileName = fileName; return this; }
            public ShareDtoBuilder folderId(Long folderId) { this.folderId = folderId; return this; }
            public ShareDtoBuilder folderName(String folderName) { this.folderName = folderName; return this; }
            public ShareDtoBuilder itemType(String itemType) { this.itemType = itemType; return this; }
            public ShareDtoBuilder sharedWithEmail(String sharedWithEmail) { this.sharedWithEmail = sharedWithEmail; return this; }
            public ShareDtoBuilder sharedWithFullName(String sharedWithFullName) { this.sharedWithFullName = sharedWithFullName; return this; }
            public ShareDtoBuilder role(String role) { this.role = role; return this; }
            public ShareDtoBuilder createdByEmail(String createdByEmail) { this.createdByEmail = createdByEmail; return this; }
            public ShareDtoBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

            public ShareDto build() {
                return new ShareDto(id, fileId, fileName, folderId, folderName, itemType, sharedWithEmail, sharedWithFullName, role, createdByEmail, createdAt);
            }
        }
    }

    public static class CreateLinkShareRequest {
        private Long fileId;
        private Long folderId;
        private Integer expiryDays;
        private String password;
        private String role;

        public CreateLinkShareRequest() {}
        public CreateLinkShareRequest(Long fileId, Long folderId, Integer expiryDays, String password, String role) {
            this.fileId = fileId;
            this.folderId = folderId;
            this.expiryDays = expiryDays;
            this.password = password;
            this.role = role;
        }

        public Long getFileId() { return fileId; }
        public void setFileId(Long fileId) { this.fileId = fileId; }
        public Long getFolderId() { return folderId; }
        public void setFolderId(Long folderId) { this.folderId = folderId; }
        public Integer getExpiryDays() { return expiryDays; }
        public void setExpiryDays(Integer expiryDays) { this.expiryDays = expiryDays; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }
    }

    public static class LinkShareDto {
        private Long id;
        private String token;
        private String shareUrl;
        private Long fileId;
        private String fileName;
        private Long folderId;
        private String folderName;
        private String itemType;
        private boolean isPasswordProtected;
        private LocalDateTime expiresAt;
        private String role;
        private Integer accessCount;
        private LocalDateTime createdAt;

        public LinkShareDto() {}
        public LinkShareDto(Long id, String token, String shareUrl, Long fileId, String fileName, Long folderId, String folderName, String itemType, boolean isPasswordProtected, LocalDateTime expiresAt, String role, Integer accessCount, LocalDateTime createdAt) {
            this.id = id;
            this.token = token;
            this.shareUrl = shareUrl;
            this.fileId = fileId;
            this.fileName = fileName;
            this.folderId = folderId;
            this.folderName = folderName;
            this.itemType = itemType;
            this.isPasswordProtected = isPasswordProtected;
            this.expiresAt = expiresAt;
            this.role = role;
            this.accessCount = accessCount;
            this.createdAt = createdAt;
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getToken() { return token; }
        public void setToken(String token) { this.token = token; }
        public String getShareUrl() { return shareUrl; }
        public void setShareUrl(String shareUrl) { this.shareUrl = shareUrl; }
        public Long getFileId() { return fileId; }
        public void setFileId(Long fileId) { this.fileId = fileId; }
        public String getFileName() { return fileName; }
        public void setFileName(String fileName) { this.fileName = fileName; }
        public Long getFolderId() { return folderId; }
        public void setFolderId(Long folderId) { this.folderId = folderId; }
        public String getFolderName() { return folderName; }
        public void setFolderName(String folderName) { this.folderName = folderName; }
        public String getItemType() { return itemType; }
        public void setItemType(String itemType) { this.itemType = itemType; }
        public boolean isPasswordProtected() { return isPasswordProtected; }
        public void setPasswordProtected(boolean passwordProtected) { isPasswordProtected = passwordProtected; }
        public LocalDateTime getExpiresAt() { return expiresAt; }
        public void setExpiresAt(LocalDateTime expiresAt) { this.expiresAt = expiresAt; }
        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }
        public Integer getAccessCount() { return accessCount; }
        public void setAccessCount(Integer accessCount) { this.accessCount = accessCount; }
        public LocalDateTime getCreatedAt() { return createdAt; }
        public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

        public static LinkShareDtoBuilder builder() { return new LinkShareDtoBuilder(); }
        public static class LinkShareDtoBuilder {
            private Long id;
            private String token;
            private String shareUrl;
            private Long fileId;
            private String fileName;
            private Long folderId;
            private String folderName;
            private String itemType;
            private boolean isPasswordProtected;
            private LocalDateTime expiresAt;
            private String role;
            private Integer accessCount;
            private LocalDateTime createdAt;

            public LinkShareDtoBuilder id(Long id) { this.id = id; return this; }
            public LinkShareDtoBuilder token(String token) { this.token = token; return this; }
            public LinkShareDtoBuilder shareUrl(String shareUrl) { this.shareUrl = shareUrl; return this; }
            public LinkShareDtoBuilder fileId(Long fileId) { this.fileId = fileId; return this; }
            public LinkShareDtoBuilder fileName(String fileName) { this.fileName = fileName; return this; }
            public LinkShareDtoBuilder folderId(Long folderId) { this.folderId = folderId; return this; }
            public LinkShareDtoBuilder folderName(String folderName) { this.folderName = folderName; return this; }
            public LinkShareDtoBuilder itemType(String itemType) { this.itemType = itemType; return this; }
            public LinkShareDtoBuilder isPasswordProtected(boolean isPasswordProtected) { this.isPasswordProtected = isPasswordProtected; return this; }
            public LinkShareDtoBuilder expiresAt(LocalDateTime expiresAt) { this.expiresAt = expiresAt; return this; }
            public LinkShareDtoBuilder role(String role) { this.role = role; return this; }
            public LinkShareDtoBuilder accessCount(Integer accessCount) { this.accessCount = accessCount; return this; }
            public LinkShareDtoBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

            public LinkShareDto build() {
                return new LinkShareDto(id, token, shareUrl, fileId, fileName, folderId, folderName, itemType, isPasswordProtected, expiresAt, role, accessCount, createdAt);
            }
        }
    }

    public static class AccessLinkRequest {
        private String password;
        public AccessLinkRequest() {}
        public AccessLinkRequest(String password) { this.password = password; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
}
