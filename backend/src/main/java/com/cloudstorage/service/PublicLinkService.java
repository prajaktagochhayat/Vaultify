package com.cloudstorage.service;

import com.cloudstorage.dto.ShareDtos;
import com.cloudstorage.model.*;
import com.cloudstorage.repository.*;
import org.springframework.core.io.Resource;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class PublicLinkService {

    private final LinkShareRepository linkShareRepository;
    private final FileItemRepository fileItemRepository;
    private final FolderRepository folderRepository;
    private final FileStorageService fileStorageService;
    private final PasswordEncoder passwordEncoder;

    public PublicLinkService(LinkShareRepository linkShareRepository, FileItemRepository fileItemRepository, FolderRepository folderRepository, FileStorageService fileStorageService, PasswordEncoder passwordEncoder) {
        this.linkShareRepository = linkShareRepository;
        this.fileItemRepository = fileItemRepository;
        this.folderRepository = folderRepository;
        this.fileStorageService = fileStorageService;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public ShareDtos.LinkShareDto createPublicLink(User creator, ShareDtos.CreateLinkShareRequest request) {
        FileItem fileItem = null;
        Folder folder = null;

        if (request.getFileId() != null) {
            fileItem = fileItemRepository.findByIdAndOwner(request.getFileId(), creator)
                    .orElseThrow(() -> new RuntimeException("File not found"));
        } else if (request.getFolderId() != null) {
            folder = folderRepository.findByIdAndOwner(request.getFolderId(), creator)
                    .orElseThrow(() -> new RuntimeException("Folder not found"));
        } else {
            throw new RuntimeException("File ID or Folder ID must be provided");
        }

        String token = UUID.randomUUID().toString().replace("-", "");

        LocalDateTime expiresAt = null;
        if (request.getExpiryDays() != null && request.getExpiryDays() > 0) {
            expiresAt = LocalDateTime.now().plusDays(request.getExpiryDays());
        }

        String passwordHash = null;
        if (request.getPassword() != null && !request.getPassword().trim().isEmpty()) {
            passwordHash = passwordEncoder.encode(request.getPassword().trim());
        }

        LinkShare linkShare = LinkShare.builder()
                .token(token)
                .fileItem(fileItem)
                .folder(folder)
                .expiresAt(expiresAt)
                .passwordHash(passwordHash)
                .createdBy(creator)
                .build();

        linkShare = linkShareRepository.save(linkShare);

        return mapToDto(linkShare);
    }

    public ShareDtos.LinkShareDto getPublicLinkInfo(String token) {
        LinkShare linkShare = linkShareRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Public share link not found or expired"));

        if (linkShare.getExpiresAt() != null && linkShare.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("This share link has expired");
        }

        return mapToDto(linkShare);
    }

    @Transactional
    public Resource accessPublicLinkFile(String token, String password) {
        LinkShare linkShare = linkShareRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Public share link not found or expired"));

        if (linkShare.getExpiresAt() != null && linkShare.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("This share link has expired");
        }

        if (linkShare.getPasswordHash() != null) {
            if (password == null || !passwordEncoder.matches(password, linkShare.getPasswordHash())) {
                throw new RuntimeException("Invalid password for public link access");
            }
        }

        linkShare.setAccessCount(linkShare.getAccessCount() + 1);
        linkShareRepository.save(linkShare);

        FileItem fileItem = linkShare.getFileItem();
        if (fileItem == null || fileItem.isTrashed()) {
            throw new RuntimeException("Shared file is no longer available");
        }

        return fileStorageService.loadFileAsResource(fileItem.getStoragePath());
    }

    private ShareDtos.LinkShareDto mapToDto(LinkShare linkShare) {
        return ShareDtos.LinkShareDto.builder()
                .id(linkShare.getId())
                .token(linkShare.getToken())
                .shareUrl("/share/" + linkShare.getToken())
                .fileId(linkShare.getFileItem() != null ? linkShare.getFileItem().getId() : null)
                .fileName(linkShare.getFileItem() != null ? linkShare.getFileItem().getName() : null)
                .folderId(linkShare.getFolder() != null ? linkShare.getFolder().getId() : null)
                .folderName(linkShare.getFolder() != null ? linkShare.getFolder().getName() : null)
                .itemType(linkShare.getFileItem() != null ? "FILE" : "FOLDER")
                .isPasswordProtected(linkShare.getPasswordHash() != null)
                .expiresAt(linkShare.getExpiresAt())
                .role(linkShare.getRole().name())
                .accessCount(linkShare.getAccessCount())
                .createdAt(linkShare.getCreatedAt())
                .build();
    }
}
