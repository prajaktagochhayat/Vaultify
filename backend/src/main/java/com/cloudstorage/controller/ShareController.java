package com.cloudstorage.controller;

import com.cloudstorage.dto.DriveDtos;
import com.cloudstorage.dto.ShareDtos;
import com.cloudstorage.model.User;
import com.cloudstorage.repository.UserRepository;
import com.cloudstorage.service.ShareService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/shares")
public class ShareController {

    private final ShareService shareService;
    private final UserRepository userRepository;

    public ShareController(ShareService shareService, UserRepository userRepository) {
        this.shareService = shareService;
        this.userRepository = userRepository;
    }

    private User getAuthenticatedUser(UserDetails userDetails) {
        return userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @PostMapping
    public ResponseEntity<ShareDtos.ShareDto> shareItem(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody ShareDtos.ShareRequest request) {
        User user = getAuthenticatedUser(userDetails);
        return ResponseEntity.ok(shareService.shareItem(user, request));
    }

    @GetMapping("/shared-with-me")
    public ResponseEntity<DriveDtos.DriveSummaryResponse> getSharedWithMe(
            @AuthenticationPrincipal UserDetails userDetails) {
        User user = getAuthenticatedUser(userDetails);
        return ResponseEntity.ok(shareService.getSharedWithMeItems(user));
    }
}
