package com.cloudstorage.controller;

import com.cloudstorage.dto.DriveDtos;
import com.cloudstorage.model.FileItem;
import com.cloudstorage.model.User;
import com.cloudstorage.repository.UserRepository;
import com.cloudstorage.service.FileService;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import org.springframework.security.crypto.password.PasswordEncoder;

@RestController
@RequestMapping("/api/files")
public class FileController {

    private final FileService fileService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public FileController(FileService fileService, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.fileService = fileService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    private User getAuthenticatedUser(UserDetails userDetails) {
        String email = userDetails.getUsername();
        return userRepository.findByEmail(email)
                .orElseGet(() -> {
                    String prefix = email.contains("@") ? email.substring(0, email.indexOf("@")) : email;
                    String formattedName = prefix.substring(0, 1).toUpperCase() + (prefix.length() > 1 ? prefix.substring(1) : "");
                    User newUser = User.builder()
                            .email(email)
                            .fullName(formattedName)
                            .password(passwordEncoder.encode(java.util.UUID.randomUUID().toString()))
                            .role(User.Role.USER)
                            .storageQuota(5368709120L)
                            .storageUsed(0L)
                            .build();
                    return userRepository.save(newUser);
                });
    }

    @PostMapping("/upload")
    public ResponseEntity<DriveDtos.FileDto> uploadFile(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "folderId", required = false) Long folderId) {
        User user = getAuthenticatedUser(userDetails);
        return ResponseEntity.ok(fileService.uploadFile(user, file, folderId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DriveDtos.FileDto> getFileMetadata(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id) {
        User user = getAuthenticatedUser(userDetails);
        FileItem file = fileService.getFileMetadata(id);
        return ResponseEntity.ok(fileService.mapToDto(file));
    }

    @GetMapping("/{id}/download")
    public ResponseEntity<Resource> downloadFile(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id) {
        User user = getAuthenticatedUser(userDetails);
        FileItem fileItem = fileService.getFileMetadata(id);
        Resource resource = fileService.getFileResource(user, id);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(fileItem.getMimeType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileItem.getOriginalName() + "\"")
                .body(resource);
    }

    @GetMapping("/{id}/preview")
    public ResponseEntity<Resource> previewFile(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id) {
        User user = getAuthenticatedUser(userDetails);
        FileItem fileItem = fileService.getFileMetadata(id);
        Resource resource = fileService.getFileResource(user, id);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(fileItem.getMimeType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + fileItem.getOriginalName() + "\"")
                .body(resource);
    }

    @PutMapping("/{id}/rename")
    public ResponseEntity<DriveDtos.FileDto> renameFile(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id,
            @RequestBody DriveDtos.RenameRequest request) {
        User user = getAuthenticatedUser(userDetails);
        return ResponseEntity.ok(fileService.renameFile(user, id, request.getName()));
    }

    @PutMapping("/{id}/move")
    public ResponseEntity<DriveDtos.FileDto> moveFile(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id,
            @RequestBody DriveDtos.MoveRequest request) {
        User user = getAuthenticatedUser(userDetails);
        return ResponseEntity.ok(fileService.moveFile(user, id, request.getTargetFolderId()));
    }

    @PutMapping("/{id}/trash")
    public ResponseEntity<Void> trashFile(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id) {
        User user = getAuthenticatedUser(userDetails);
        fileService.trashFile(user, id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/restore")
    public ResponseEntity<Void> restoreFile(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id) {
        User user = getAuthenticatedUser(userDetails);
        fileService.restoreFile(user, id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFilePermanently(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id) {
        User user = getAuthenticatedUser(userDetails);
        fileService.deleteFilePermanently(user, id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/star")
    public ResponseEntity<Void> starFile(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id) {
        User user = getAuthenticatedUser(userDetails);
        fileService.toggleStarFile(user, id);
        return ResponseEntity.ok().build();
    }
}
