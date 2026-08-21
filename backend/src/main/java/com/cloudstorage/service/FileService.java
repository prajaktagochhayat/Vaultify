package com.cloudstorage.service;

import com.cloudstorage.dto.DriveDtos;
import com.cloudstorage.model.*;
import com.cloudstorage.repository.*;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@Service
public class FileService {

    private final FileItemRepository fileItemRepository;
    private final FolderRepository folderRepository;
    private final UserRepository userRepository;
    private final FileVersionRepository fileVersionRepository;
    private final StarRepository starRepository;
    private final FileStorageService fileStorageService;
    private final ActivityService activityService;

    public FileService(FileItemRepository fileItemRepository, FolderRepository folderRepository, UserRepository userRepository, FileVersionRepository fileVersionRepository, StarRepository starRepository, FileStorageService fileStorageService, ActivityService activityService) {
        this.fileItemRepository = fileItemRepository;
        this.folderRepository = folderRepository;
        this.userRepository = userRepository;
        this.fileVersionRepository = fileVersionRepository;
        this.starRepository = starRepository;
        this.fileStorageService = fileStorageService;
        this.activityService = activityService;
    }

    @Transactional
    public DriveDtos.FileDto uploadFile(User owner, MultipartFile file, Long folderId) {
        if (owner.getStorageUsed() + file.getSize() > owner.getStorageQuota()) {
            throw new RuntimeException("Storage quota exceeded!");
        }

        Folder folder = null;
        if (folderId != null) {
            folder = folderRepository.findByIdAndOwner(folderId, owner)
                    .orElseThrow(() -> new RuntimeException("Folder not found"));
        }

        String storedFileName = fileStorageService.storeFile(file);

        FileItem fileItem = FileItem.builder()
                .name(file.getOriginalFilename())
                .originalName(file.getOriginalFilename())
                .mimeType(file.getContentType() != null ? file.getContentType() : "application/octet-stream")
                .size(file.getSize())
                .storagePath(storedFileName)
                .folder(folder)
                .owner(owner)
                .currentVersion(1)
                .build();

        fileItem = fileItemRepository.save(fileItem);

        // Save version 1 record
        FileVersion version = FileVersion.builder()
                .fileItem(fileItem)
                .versionNumber(1)
                .storagePath(storedFileName)
                .size(file.getSize())
                .createdBy(owner)
                .build();
        fileVersionRepository.save(version);

        // Update user storage used
        owner.setStorageUsed(owner.getStorageUsed() + file.getSize());
        userRepository.save(owner);

        activityService.logActivity(
                owner,
                ActivityLog.ActionType.UPLOAD,
                "FILE",
                fileItem.getId(),
                fileItem.getName(),
                "Uploaded file: " + fileItem.getName() + " (" + file.getSize() + " bytes)"
        );

        return mapToDto(fileItem);
    }

    public Resource getFileResource(User user, Long fileId) {
        FileItem fileItem = fileItemRepository.findById(fileId)
                .orElseThrow(() -> new RuntimeException("File not found"));

        activityService.logActivity(
                user,
                ActivityLog.ActionType.DOWNLOAD,
                "FILE",
                fileItem.getId(),
                fileItem.getName(),
                "Downloaded file: " + fileItem.getName()
        );

        return fileStorageService.loadFileAsResource(fileItem.getStoragePath());
    }

    public FileItem getFileMetadata(Long fileId) {
        return fileItemRepository.findById(fileId)
                .orElseThrow(() -> new RuntimeException("File not found"));
    }

    @Transactional
    public DriveDtos.FileDto renameFile(User owner, Long fileId, String newName) {
        FileItem fileItem = fileItemRepository.findByIdAndOwner(fileId, owner)
                .orElseThrow(() -> new RuntimeException("File not found"));

        String oldName = fileItem.getName();
        fileItem.setName(newName);
        fileItem = fileItemRepository.save(fileItem);

        activityService.logActivity(
                owner,
                ActivityLog.ActionType.RENAME,
                "FILE",
                fileItem.getId(),
                fileItem.getName(),
                "Renamed file from " + oldName + " to " + newName
        );

        return mapToDto(fileItem);
    }

    @Transactional
    public DriveDtos.FileDto moveFile(User owner, Long fileId, Long targetFolderId) {
        FileItem fileItem = fileItemRepository.findByIdAndOwner(fileId, owner)
                .orElseThrow(() -> new RuntimeException("File not found"));

        Folder targetFolder = null;
        if (targetFolderId != null) {
            targetFolder = folderRepository.findByIdAndOwner(targetFolderId, owner)
                    .orElseThrow(() -> new RuntimeException("Target folder not found"));
        }

        fileItem.setFolder(targetFolder);
        fileItem = fileItemRepository.save(fileItem);

        activityService.logActivity(
                owner,
                ActivityLog.ActionType.MOVE,
                "FILE",
                fileItem.getId(),
                fileItem.getName(),
                "Moved file " + fileItem.getName()
        );

        return mapToDto(fileItem);
    }

    @Transactional
    public void trashFile(User owner, Long fileId) {
        FileItem fileItem = fileItemRepository.findByIdAndOwner(fileId, owner)
                .orElseThrow(() -> new RuntimeException("File not found"));

        fileItem.setTrashed(true);
        fileItem.setTrashedAt(LocalDateTime.now());
        fileItemRepository.save(fileItem);

        activityService.logActivity(
                owner,
                ActivityLog.ActionType.TRASH,
                "FILE",
                fileItem.getId(),
                fileItem.getName(),
                "Moved file to trash: " + fileItem.getName()
        );
    }

    @Transactional
    public void restoreFile(User owner, Long fileId) {
        FileItem fileItem = fileItemRepository.findByIdAndOwner(fileId, owner)
                .orElseThrow(() -> new RuntimeException("File not found"));

        fileItem.setTrashed(false);
        fileItem.setTrashedAt(null);
        fileItemRepository.save(fileItem);

        activityService.logActivity(
                owner,
                ActivityLog.ActionType.RESTORE,
                "FILE",
                fileItem.getId(),
                fileItem.getName(),
                "Restored file from trash: " + fileItem.getName()
        );
    }

    @Transactional
    public void deleteFilePermanently(User owner, Long fileId) {
        FileItem fileItem = fileItemRepository.findByIdAndOwner(fileId, owner)
                .orElseThrow(() -> new RuntimeException("File not found"));

        // Delete physical file
        fileStorageService.deleteFile(fileItem.getStoragePath());

        // Update user storage
        owner.setStorageUsed(Math.max(0L, owner.getStorageUsed() - fileItem.getSize()));
        userRepository.save(owner);

        fileItemRepository.delete(fileItem);

        activityService.logActivity(
                owner,
                ActivityLog.ActionType.DELETE_PERMANENT,
                "FILE",
                fileId,
                fileItem.getName(),
                "Permanently deleted file: " + fileItem.getName()
        );
    }

    @Transactional
    public void toggleStarFile(User owner, Long fileId) {
        FileItem fileItem = fileItemRepository.findByIdAndOwner(fileId, owner)
                .orElseThrow(() -> new RuntimeException("File not found"));

        boolean newStarred = !fileItem.isStarred();
        fileItem.setStarred(newStarred);
        fileItemRepository.save(fileItem);

        if (newStarred) {
            starRepository.save(Star.builder().user(owner).fileItem(fileItem).build());
        } else {
            starRepository.deleteByUserAndFileItem(owner, fileItem);
        }

        activityService.logActivity(
                owner,
                newStarred ? ActivityLog.ActionType.STAR : ActivityLog.ActionType.UNSTAR,
                "FILE",
                fileItem.getId(),
                fileItem.getName(),
                (newStarred ? "Starred" : "Unstarred") + " file: " + fileItem.getName()
        );
    }

    public DriveDtos.FileDto mapToDto(FileItem file) {
        if (file == null) return null;
        return DriveDtos.FileDto.builder()
                .id(file.getId())
                .name(file.getName())
                .originalName(file.getOriginalName())
                .mimeType(file.getMimeType())
                .size(file.getSize())
                .folderId(file.getFolder() != null ? file.getFolder().getId() : null)
                .folderName(file.getFolder() != null ? file.getFolder().getName() : null)
                .ownerId(file.getOwner().getId())
                .ownerName(file.getOwner().getFullName())
                .version(file.getCurrentVersion())
                .isStarred(file.isStarred())
                .isTrashed(file.isTrashed())
                .createdAt(file.getCreatedAt())
                .updatedAt(file.getUpdatedAt())
                .build();
    }
}
