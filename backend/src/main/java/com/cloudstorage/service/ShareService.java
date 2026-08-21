package com.cloudstorage.service;

import com.cloudstorage.dto.DriveDtos;
import com.cloudstorage.dto.ShareDtos;
import com.cloudstorage.model.*;
import com.cloudstorage.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ShareService {

    private final ShareRepository shareRepository;
    private final UserRepository userRepository;
    private final FileItemRepository fileItemRepository;
    private final FolderRepository folderRepository;
    private final FolderService folderService;
    private final FileService fileService;
    private final ActivityService activityService;
    private final org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

    public ShareService(ShareRepository shareRepository, UserRepository userRepository, FileItemRepository fileItemRepository, FolderRepository folderRepository, FolderService folderService, FileService fileService, ActivityService activityService, org.springframework.security.crypto.password.PasswordEncoder passwordEncoder) {
        this.shareRepository = shareRepository;
        this.userRepository = userRepository;
        this.fileItemRepository = fileItemRepository;
        this.folderRepository = folderRepository;
        this.folderService = folderService;
        this.fileService = fileService;
        this.activityService = activityService;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public ShareDtos.ShareDto shareItem(User creator, ShareDtos.ShareRequest request) {
        String targetEmail = request.getUserEmail() != null ? request.getUserEmail().trim() : "";
        if (targetEmail.isEmpty()) {
            throw new RuntimeException("Target user email cannot be empty");
        }

        if (targetEmail.equalsIgnoreCase(creator.getEmail())) {
            throw new RuntimeException("You cannot share items with yourself");
        }

        User targetUser = userRepository.findByEmail(targetEmail)
                .orElseGet(() -> {
                    String prefix = targetEmail.contains("@") ? targetEmail.substring(0, targetEmail.indexOf("@")) : targetEmail;
                    String formattedName = prefix.substring(0, 1).toUpperCase() + (prefix.length() > 1 ? prefix.substring(1) : "");
                    User newUser = User.builder()
                            .email(targetEmail)
                            .fullName(formattedName)
                            .password(passwordEncoder.encode(java.util.UUID.randomUUID().toString()))
                            .role(User.Role.USER)
                            .storageQuota(5368709120L)
                            .storageUsed(0L)
                            .build();
                    return userRepository.save(newUser);
                });

        FileItem fileItem = null;
        Folder folder = null;

        if (request.getFileId() != null) {
            fileItem = fileItemRepository.findByIdAndOwner(request.getFileId(), creator)
                    .orElseThrow(() -> new RuntimeException("File not found or access denied"));
        } else if (request.getFolderId() != null) {
            folder = folderRepository.findByIdAndOwner(request.getFolderId(), creator)
                    .orElseThrow(() -> new RuntimeException("Folder not found or access denied"));
        } else {
            throw new RuntimeException("Must specify either fileId or folderId");
        }

        Share.ShareRole role = Share.ShareRole.valueOf(request.getRole().toUpperCase());

        Share share = Share.builder()
                .fileItem(fileItem)
                .folder(folder)
                .sharedWithUser(targetUser)
                .role(role)
                .createdBy(creator)
                .build();

        share = shareRepository.save(share);

        String itemName = fileItem != null ? fileItem.getName() : folder.getName();
        activityService.logActivity(
                creator,
                ActivityLog.ActionType.SHARE,
                fileItem != null ? "FILE" : "FOLDER",
                fileItem != null ? fileItem.getId() : folder.getId(),
                itemName,
                "Shared " + (fileItem != null ? "file" : "folder") + " with " + targetUser.getEmail() + " as " + role.name()
        );

        return mapToDto(share);
    }

    public DriveDtos.DriveSummaryResponse getSharedWithMeItems(User currentUser) {
        List<Share> shares = shareRepository.findBySharedWithUser(currentUser);

        List<DriveDtos.FolderDto> sharedFolders = shares.stream()
                .filter(s -> s.getFolder() != null && !s.getFolder().isTrashed())
                .map(s -> folderService.mapToDto(s.getFolder()))
                .collect(Collectors.toList());

        List<DriveDtos.FileDto> sharedFiles = shares.stream()
                .filter(s -> s.getFileItem() != null && !s.getFileItem().isTrashed())
                .map(s -> fileService.mapToDto(s.getFileItem()))
                .collect(Collectors.toList());

        return DriveDtos.DriveSummaryResponse.builder()
                .folders(sharedFolders)
                .files(sharedFiles)
                .build();
    }

    private ShareDtos.ShareDto mapToDto(Share share) {
        return ShareDtos.ShareDto.builder()
                .id(share.getId())
                .fileId(share.getFileItem() != null ? share.getFileItem().getId() : null)
                .fileName(share.getFileItem() != null ? share.getFileItem().getName() : null)
                .folderId(share.getFolder() != null ? share.getFolder().getId() : null)
                .folderName(share.getFolder() != null ? share.getFolder().getName() : null)
                .itemType(share.getFileItem() != null ? "FILE" : "FOLDER")
                .sharedWithEmail(share.getSharedWithUser().getEmail())
                .sharedWithFullName(share.getSharedWithUser().getFullName())
                .role(share.getRole().name())
                .createdByEmail(share.getCreatedBy().getEmail())
                .createdAt(share.getCreatedAt())
                .build();
    }
}
