package com.cloudstorage.service;

import com.cloudstorage.dto.DriveDtos;
import com.cloudstorage.model.*;
import com.cloudstorage.repository.FolderRepository;
import com.cloudstorage.repository.FileItemRepository;
import com.cloudstorage.repository.StarRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class FolderService {

    private final FolderRepository folderRepository;
    private final FileItemRepository fileItemRepository;
    private final StarRepository starRepository;
    private final ActivityService activityService;

    public FolderService(FolderRepository folderRepository, FileItemRepository fileItemRepository, StarRepository starRepository, ActivityService activityService) {
        this.folderRepository = folderRepository;
        this.fileItemRepository = fileItemRepository;
        this.starRepository = starRepository;
        this.activityService = activityService;
    }

    @Transactional
    public DriveDtos.FolderDto createFolder(User owner, DriveDtos.CreateFolderRequest request) {
        Folder parent = null;
        if (request.getParentId() != null) {
            parent = folderRepository.findByIdAndOwner(request.getParentId(), owner)
                    .orElseThrow(() -> new RuntimeException("Parent folder not found"));
        }

        Folder folder = Folder.builder()
                .name(request.getName())
                .parent(parent)
                .owner(owner)
                .build();

        folder = folderRepository.save(folder);

        activityService.logActivity(
                owner,
                ActivityLog.ActionType.CREATE_FOLDER,
                "FOLDER",
                folder.getId(),
                folder.getName(),
                "Created folder: " + folder.getName()
        );

        return mapToDto(folder);
    }

    public DriveDtos.FolderContentResponse getFolderContents(User owner, Long folderId) {
        Folder currentFolder = null;
        List<DriveDtos.FolderDto> breadcrumbs = new ArrayList<>();

        if (folderId != null) {
            currentFolder = folderRepository.findByIdAndOwner(folderId, owner)
                    .orElseThrow(() -> new RuntimeException("Folder not found"));

            // Build breadcrumbs path
            Folder temp = currentFolder;
            while (temp != null) {
                breadcrumbs.add(0, mapToDto(temp));
                temp = temp.getParent();
            }
        }

        List<Folder> folders = (currentFolder == null)
                ? folderRepository.findByOwnerAndParentIsNullAndIsTrashed(owner, false)
                : folderRepository.findByOwnerAndParentAndIsTrashed(owner, currentFolder, false);

        List<FileItem> files = (currentFolder == null)
                ? fileItemRepository.findByOwnerAndFolderIsNullAndIsTrashed(owner, false)
                : fileItemRepository.findByOwnerAndFolderAndIsTrashed(owner, currentFolder, false);

        return DriveDtos.FolderContentResponse.builder()
                .currentFolder(currentFolder != null ? mapToDto(currentFolder) : null)
                .breadcrumbs(breadcrumbs)
                .folders(folders.stream().map(this::mapToDto).collect(Collectors.toList()))
                .files(files.stream().map(this::mapToFileDto).collect(Collectors.toList()))
                .build();
    }

    @Transactional
    public DriveDtos.FolderDto renameFolder(User owner, Long folderId, String newName) {
        Folder folder = folderRepository.findByIdAndOwner(folderId, owner)
                .orElseThrow(() -> new RuntimeException("Folder not found"));

        String oldName = folder.getName();
        folder.setName(newName);
        folder = folderRepository.save(folder);

        activityService.logActivity(
                owner,
                ActivityLog.ActionType.RENAME,
                "FOLDER",
                folder.getId(),
                folder.getName(),
                "Renamed folder from " + oldName + " to " + newName
        );

        return mapToDto(folder);
    }

    @Transactional
    public DriveDtos.FolderDto moveFolder(User owner, Long folderId, Long targetFolderId) {
        Folder folder = folderRepository.findByIdAndOwner(folderId, owner)
                .orElseThrow(() -> new RuntimeException("Folder not found"));

        Folder targetFolder = null;
        if (targetFolderId != null) {
            if (folderId.equals(targetFolderId)) {
                throw new RuntimeException("Cannot move folder into itself");
            }
            targetFolder = folderRepository.findByIdAndOwner(targetFolderId, owner)
                    .orElseThrow(() -> new RuntimeException("Target folder not found"));
        }

        folder.setParent(targetFolder);
        folder = folderRepository.save(folder);

        activityService.logActivity(
                owner,
                ActivityLog.ActionType.MOVE,
                "FOLDER",
                folder.getId(),
                folder.getName(),
                "Moved folder " + folder.getName()
        );

        return mapToDto(folder);
    }

    @Transactional
    public void trashFolder(User owner, Long folderId) {
        Folder folder = folderRepository.findByIdAndOwner(folderId, owner)
                .orElseThrow(() -> new RuntimeException("Folder not found"));

        folder.setTrashed(true);
        folder.setTrashedAt(LocalDateTime.now());
        folderRepository.save(folder);

        activityService.logActivity(
                owner,
                ActivityLog.ActionType.TRASH,
                "FOLDER",
                folder.getId(),
                folder.getName(),
                "Moved folder to trash: " + folder.getName()
        );
    }

    @Transactional
    public void restoreFolder(User owner, Long folderId) {
        Folder folder = folderRepository.findByIdAndOwner(folderId, owner)
                .orElseThrow(() -> new RuntimeException("Folder not found"));

        folder.setTrashed(false);
        folder.setTrashedAt(null);
        folderRepository.save(folder);

        activityService.logActivity(
                owner,
                ActivityLog.ActionType.RESTORE,
                "FOLDER",
                folder.getId(),
                folder.getName(),
                "Restored folder from trash: " + folder.getName()
        );
    }

    @Transactional
    public void toggleStarFolder(User owner, Long folderId) {
        Folder folder = folderRepository.findByIdAndOwner(folderId, owner)
                .orElseThrow(() -> new RuntimeException("Folder not found"));

        boolean newStarred = !folder.isStarred();
        folder.setStarred(newStarred);
        folderRepository.save(folder);

        if (newStarred) {
            starRepository.save(Star.builder().user(owner).folder(folder).build());
        } else {
            starRepository.deleteByUserAndFolder(owner, folder);
        }

        activityService.logActivity(
                owner,
                newStarred ? ActivityLog.ActionType.STAR : ActivityLog.ActionType.UNSTAR,
                "FOLDER",
                folder.getId(),
                folder.getName(),
                (newStarred ? "Starred" : "Unstarred") + " folder: " + folder.getName()
        );
    }

    public DriveDtos.FolderDto mapToDto(Folder folder) {
        if (folder == null) return null;
        return DriveDtos.FolderDto.builder()
                .id(folder.getId())
                .name(folder.getName())
                .parentId(folder.getParent() != null ? folder.getParent().getId() : null)
                .parentName(folder.getParent() != null ? folder.getParent().getName() : null)
                .ownerId(folder.getOwner().getId())
                .ownerName(folder.getOwner().getFullName())
                .isStarred(folder.isStarred())
                .isTrashed(folder.isTrashed())
                .createdAt(folder.getCreatedAt())
                .updatedAt(folder.getUpdatedAt())
                .build();
    }

    private DriveDtos.FileDto mapToFileDto(FileItem file) {
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
