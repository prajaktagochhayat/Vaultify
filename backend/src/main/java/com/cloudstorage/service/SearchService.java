package com.cloudstorage.service;

import com.cloudstorage.dto.DriveDtos;
import com.cloudstorage.model.FileItem;
import com.cloudstorage.model.Folder;
import com.cloudstorage.model.User;
import com.cloudstorage.repository.FileItemRepository;
import com.cloudstorage.repository.FolderRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SearchService {

    private final FolderRepository folderRepository;
    private final FileItemRepository fileItemRepository;
    private final FolderService folderService;
    private final FileService fileService;

    public SearchService(FolderRepository folderRepository, FileItemRepository fileItemRepository, FolderService folderService, FileService fileService) {
        this.folderRepository = folderRepository;
        this.fileItemRepository = fileItemRepository;
        this.folderService = folderService;
        this.fileService = fileService;
    }

    public DriveDtos.DriveSummaryResponse search(User user, String query, String mimeTypePrefix) {
        List<Folder> folders;
        List<FileItem> files;

        if (query != null && !query.trim().isEmpty()) {
            folders = folderRepository.findByNameContainingIgnoreCaseAndOwnerAndIsTrashed(query.trim(), user, false);
            files = fileItemRepository.findByNameContainingIgnoreCaseAndOwnerAndIsTrashed(query.trim(), user, false);
        } else if (mimeTypePrefix != null && !mimeTypePrefix.trim().isEmpty()) {
            folders = List.of();
            files = fileItemRepository.findByMimeTypeStartingWithAndOwnerAndIsTrashed(mimeTypePrefix.trim(), user, false);
        } else {
            folders = List.of();
            files = List.of();
        }

        return DriveDtos.DriveSummaryResponse.builder()
                .folders(folders.stream().map(folderService::mapToDto).collect(Collectors.toList()))
                .files(files.stream().map(fileService::mapToDto).collect(Collectors.toList()))
                .build();
    }

    public DriveDtos.DriveSummaryResponse getStarredItems(User user) {
        List<Folder> folders = folderRepository.findByOwnerAndIsStarredAndIsTrashed(user, true, false);
        List<FileItem> files = fileItemRepository.findByOwnerAndIsStarredAndIsTrashed(user, true, false);

        return DriveDtos.DriveSummaryResponse.builder()
                .folders(folders.stream().map(folderService::mapToDto).collect(Collectors.toList()))
                .files(files.stream().map(fileService::mapToDto).collect(Collectors.toList()))
                .build();
    }

    public DriveDtos.DriveSummaryResponse getTrashedItems(User user) {
        List<Folder> folders = folderRepository.findByOwnerAndIsTrashed(user, true);
        List<FileItem> files = fileItemRepository.findByOwnerAndIsTrashed(user, true);

        return DriveDtos.DriveSummaryResponse.builder()
                .folders(folders.stream().map(folderService::mapToDto).collect(Collectors.toList()))
                .files(files.stream().map(fileService::mapToDto).collect(Collectors.toList()))
                .build();
    }
}
