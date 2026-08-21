package com.cloudstorage.controller;

import com.cloudstorage.dto.DriveDtos;
import com.cloudstorage.model.User;
import com.cloudstorage.repository.UserRepository;
import com.cloudstorage.service.FolderService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import org.springframework.security.crypto.password.PasswordEncoder;

@RestController
@RequestMapping("/api/folders")
public class FolderController {

    private final FolderService folderService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public FolderController(FolderService folderService, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.folderService = folderService;
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

    @PostMapping
    public ResponseEntity<DriveDtos.FolderDto> createFolder(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody DriveDtos.CreateFolderRequest request) {
        User user = getAuthenticatedUser(userDetails);
        return ResponseEntity.ok(folderService.createFolder(user, request));
    }

    @GetMapping
    public ResponseEntity<DriveDtos.FolderContentResponse> getRootFolder(
            @AuthenticationPrincipal UserDetails userDetails) {
        User user = getAuthenticatedUser(userDetails);
        return ResponseEntity.ok(folderService.getFolderContents(user, null));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DriveDtos.FolderContentResponse> getFolderContents(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id) {
        User user = getAuthenticatedUser(userDetails);
        return ResponseEntity.ok(folderService.getFolderContents(user, id));
    }

    @PutMapping("/{id}/rename")
    public ResponseEntity<DriveDtos.FolderDto> renameFolder(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id,
            @RequestBody DriveDtos.RenameRequest request) {
        User user = getAuthenticatedUser(userDetails);
        return ResponseEntity.ok(folderService.renameFolder(user, id, request.getName()));
    }

    @PutMapping("/{id}/move")
    public ResponseEntity<DriveDtos.FolderDto> moveFolder(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id,
            @RequestBody DriveDtos.MoveRequest request) {
        User user = getAuthenticatedUser(userDetails);
        return ResponseEntity.ok(folderService.moveFolder(user, id, request.getTargetFolderId()));
    }

    @PutMapping("/{id}/trash")
    public ResponseEntity<Void> trashFolder(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id) {
        User user = getAuthenticatedUser(userDetails);
        folderService.trashFolder(user, id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/restore")
    public ResponseEntity<Void> restoreFolder(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id) {
        User user = getAuthenticatedUser(userDetails);
        folderService.restoreFolder(user, id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/star")
    public ResponseEntity<Void> starFolder(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id) {
        User user = getAuthenticatedUser(userDetails);
        folderService.toggleStarFolder(user, id);
        return ResponseEntity.ok().build();
    }
}
