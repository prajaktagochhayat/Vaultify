package com.cloudstorage.dto;

import java.time.LocalDateTime;
import java.util.List;

public class DriveDtos {

    public static class CreateFolderRequest {
        private String name;
        private Long parentId;

        public CreateFolderRequest() {}
        public CreateFolderRequest(String name, Long parentId) {
            this.name = name;
            this.parentId = parentId;
        }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public Long getParentId() { return parentId; }
        public void setParentId(Long parentId) { this.parentId = parentId; }
    }

    public static class RenameRequest {
        private String name;

        public RenameRequest() {}
        public RenameRequest(String name) { this.name = name; }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
    }

    public static class MoveRequest {
        private Long targetFolderId;

        public MoveRequest() {}
        public MoveRequest(Long targetFolderId) { this.targetFolderId = targetFolderId; }

        public Long getTargetFolderId() { return targetFolderId; }
        public void setTargetFolderId(Long targetFolderId) { this.targetFolderId = targetFolderId; }
    }

    public static class FolderDto {
        private Long id;
        private String name;
        private Long parentId;
        private String parentName;
        private Long ownerId;
        private String ownerName;
        private boolean isStarred;
        private boolean isTrashed;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public FolderDto() {}
        public FolderDto(Long id, String name, Long parentId, String parentName, Long ownerId, String ownerName, boolean isStarred, boolean isTrashed, LocalDateTime createdAt, LocalDateTime updatedAt) {
            this.id = id;
            this.name = name;
            this.parentId = parentId;
            this.parentName = parentName;
            this.ownerId = ownerId;
            this.ownerName = ownerName;
            this.isStarred = isStarred;
            this.isTrashed = isTrashed;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public Long getParentId() { return parentId; }
        public void setParentId(Long parentId) { this.parentId = parentId; }
        public String getParentName() { return parentName; }
        public void setParentName(String parentName) { this.parentName = parentName; }
        public Long getOwnerId() { return ownerId; }
        public void setOwnerId(Long ownerId) { this.ownerId = ownerId; }
        public String getOwnerName() { return ownerName; }
        public void setOwnerName(String ownerName) { this.ownerName = ownerName; }
        public boolean isStarred() { return isStarred; }
        public void setStarred(boolean starred) { isStarred = starred; }
        public boolean isTrashed() { return isTrashed; }
        public void setTrashed(boolean trashed) { isTrashed = trashed; }
        public LocalDateTime getCreatedAt() { return createdAt; }
        public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
        public LocalDateTime getUpdatedAt() { return updatedAt; }
        public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

        public static FolderDtoBuilder builder() { return new FolderDtoBuilder(); }
        public static class FolderDtoBuilder {
            private Long id;
            private String name;
            private Long parentId;
            private String parentName;
            private Long ownerId;
            private String ownerName;
            private boolean isStarred;
            private boolean isTrashed;
            private LocalDateTime createdAt;
            private LocalDateTime updatedAt;

            public FolderDtoBuilder id(Long id) { this.id = id; return this; }
            public FolderDtoBuilder name(String name) { this.name = name; return this; }
            public FolderDtoBuilder parentId(Long parentId) { this.parentId = parentId; return this; }
            public FolderDtoBuilder parentName(String parentName) { this.parentName = parentName; return this; }
            public FolderDtoBuilder ownerId(Long ownerId) { this.ownerId = ownerId; return this; }
            public FolderDtoBuilder ownerName(String ownerName) { this.ownerName = ownerName; return this; }
            public FolderDtoBuilder isStarred(boolean isStarred) { this.isStarred = isStarred; return this; }
            public FolderDtoBuilder isTrashed(boolean isTrashed) { this.isTrashed = isTrashed; return this; }
            public FolderDtoBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
            public FolderDtoBuilder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }

            public FolderDto build() {
                return new FolderDto(id, name, parentId, parentName, ownerId, ownerName, isStarred, isTrashed, createdAt, updatedAt);
            }
        }
    }

    public static class FileDto {
        private Long id;
        private String name;
        private String originalName;
        private String mimeType;
        private Long size;
        private Long folderId;
        private String folderName;
        private Long ownerId;
        private String ownerName;
        private Integer version;
        private boolean isStarred;
        private boolean isTrashed;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public FileDto() {}
        public FileDto(Long id, String name, String originalName, String mimeType, Long size, Long folderId, String folderName, Long ownerId, String ownerName, Integer version, boolean isStarred, boolean isTrashed, LocalDateTime createdAt, LocalDateTime updatedAt) {
            this.id = id;
            this.name = name;
            this.originalName = originalName;
            this.mimeType = mimeType;
            this.size = size;
            this.folderId = folderId;
            this.folderName = folderName;
            this.ownerId = ownerId;
            this.ownerName = ownerName;
            this.version = version;
            this.isStarred = isStarred;
            this.isTrashed = isTrashed;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
        }

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
        public Long getFolderId() { return folderId; }
        public void setFolderId(Long folderId) { this.folderId = folderId; }
        public String getFolderName() { return folderName; }
        public void setFolderName(String folderName) { this.folderName = folderName; }
        public Long getOwnerId() { return ownerId; }
        public void setOwnerId(Long ownerId) { this.ownerId = ownerId; }
        public String getOwnerName() { return ownerName; }
        public void setOwnerName(String ownerName) { this.ownerName = ownerName; }
        public Integer getVersion() { return version; }
        public void setVersion(Integer version) { this.version = version; }
        public boolean isStarred() { return isStarred; }
        public void setStarred(boolean starred) { isStarred = starred; }
        public boolean isTrashed() { return isTrashed; }
        public void setTrashed(boolean trashed) { isTrashed = trashed; }
        public LocalDateTime getCreatedAt() { return createdAt; }
        public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
        public LocalDateTime getUpdatedAt() { return updatedAt; }
        public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

        public static FileDtoBuilder builder() { return new FileDtoBuilder(); }
        public static class FileDtoBuilder {
            private Long id;
            private String name;
            private String originalName;
            private String mimeType;
            private Long size;
            private Long folderId;
            private String folderName;
            private Long ownerId;
            private String ownerName;
            private Integer version;
            private boolean isStarred;
            private boolean isTrashed;
            private LocalDateTime createdAt;
            private LocalDateTime updatedAt;

            public FileDtoBuilder id(Long id) { this.id = id; return this; }
            public FileDtoBuilder name(String name) { this.name = name; return this; }
            public FileDtoBuilder originalName(String originalName) { this.originalName = originalName; return this; }
            public FileDtoBuilder mimeType(String mimeType) { this.mimeType = mimeType; return this; }
            public FileDtoBuilder size(Long size) { this.size = size; return this; }
            public FileDtoBuilder folderId(Long folderId) { this.folderId = folderId; return this; }
            public FileDtoBuilder folderName(String folderName) { this.folderName = folderName; return this; }
            public FileDtoBuilder ownerId(Long ownerId) { this.ownerId = ownerId; return this; }
            public FileDtoBuilder ownerName(String ownerName) { this.ownerName = ownerName; return this; }
            public FileDtoBuilder version(Integer version) { this.version = version; return this; }
            public FileDtoBuilder isStarred(boolean isStarred) { this.isStarred = isStarred; return this; }
            public FileDtoBuilder isTrashed(boolean isTrashed) { this.isTrashed = isTrashed; return this; }
            public FileDtoBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
            public FileDtoBuilder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }

            public FileDto build() {
                return new FileDto(id, name, originalName, mimeType, size, folderId, folderName, ownerId, ownerName, version, isStarred, isTrashed, createdAt, updatedAt);
            }
        }
    }

    public static class FolderContentResponse {
        private FolderDto currentFolder;
        private List<FolderDto> breadcrumbs;
        private List<FolderDto> folders;
        private List<FileDto> files;

        public FolderContentResponse() {}
        public FolderContentResponse(FolderDto currentFolder, List<FolderDto> breadcrumbs, List<FolderDto> folders, List<FileDto> files) {
            this.currentFolder = currentFolder;
            this.breadcrumbs = breadcrumbs;
            this.folders = folders;
            this.files = files;
        }

        public FolderDto getCurrentFolder() { return currentFolder; }
        public void setCurrentFolder(FolderDto currentFolder) { this.currentFolder = currentFolder; }
        public List<FolderDto> getBreadcrumbs() { return breadcrumbs; }
        public void setBreadcrumbs(List<FolderDto> breadcrumbs) { this.breadcrumbs = breadcrumbs; }
        public List<FolderDto> getFolders() { return folders; }
        public void setFolders(List<FolderDto> folders) { this.folders = folders; }
        public List<FileDto> getFiles() { return files; }
        public void setFiles(List<FileDto> files) { this.files = files; }

        public static FolderContentResponseBuilder builder() { return new FolderContentResponseBuilder(); }
        public static class FolderContentResponseBuilder {
            private FolderDto currentFolder;
            private List<FolderDto> breadcrumbs;
            private List<FolderDto> folders;
            private List<FileDto> files;

            public FolderContentResponseBuilder currentFolder(FolderDto currentFolder) { this.currentFolder = currentFolder; return this; }
            public FolderContentResponseBuilder breadcrumbs(List<FolderDto> breadcrumbs) { this.breadcrumbs = breadcrumbs; return this; }
            public FolderContentResponseBuilder folders(List<FolderDto> folders) { this.folders = folders; return this; }
            public FolderContentResponseBuilder files(List<FileDto> files) { this.files = files; return this; }

            public FolderContentResponse build() {
                return new FolderContentResponse(currentFolder, breadcrumbs, folders, files);
            }
        }
    }

    public static class DriveSummaryResponse {
        private List<FolderDto> folders;
        private List<FileDto> files;

        public DriveSummaryResponse() {}
        public DriveSummaryResponse(List<FolderDto> folders, List<FileDto> files) {
            this.folders = folders;
            this.files = files;
        }

        public List<FolderDto> getFolders() { return folders; }
        public void setFolders(List<FolderDto> folders) { this.folders = folders; }
        public List<FileDto> getFiles() { return files; }
        public void setFiles(List<FileDto> files) { this.files = files; }

        public static DriveSummaryResponseBuilder builder() { return new DriveSummaryResponseBuilder(); }
        public static class DriveSummaryResponseBuilder {
            private List<FolderDto> folders;
            private List<FileDto> files;

            public DriveSummaryResponseBuilder folders(List<FolderDto> folders) { this.folders = folders; return this; }
            public DriveSummaryResponseBuilder files(List<FileDto> files) { this.files = files; return this; }

            public DriveSummaryResponse build() {
                return new DriveSummaryResponse(folders, files);
            }
        }
    }
}
