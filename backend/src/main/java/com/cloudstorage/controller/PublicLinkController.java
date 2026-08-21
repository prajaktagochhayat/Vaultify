package com.cloudstorage.controller;

import com.cloudstorage.dto.ShareDtos;
import com.cloudstorage.model.User;
import com.cloudstorage.repository.UserRepository;
import com.cloudstorage.service.PublicLinkService;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/public-links")
public class PublicLinkController {

    private final PublicLinkService publicLinkService;
    private final UserRepository userRepository;

    public PublicLinkController(PublicLinkService publicLinkService, UserRepository userRepository) {
        this.publicLinkService = publicLinkService;
        this.userRepository = userRepository;
    }

    @PostMapping
    public ResponseEntity<ShareDtos.LinkShareDto> createPublicLink(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody ShareDtos.CreateLinkShareRequest request) {
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(publicLinkService.createPublicLink(user, request));
    }

    @GetMapping("/{token}")
    public ResponseEntity<ShareDtos.LinkShareDto> getPublicLinkInfo(@PathVariable String token) {
        return ResponseEntity.ok(publicLinkService.getPublicLinkInfo(token));
    }

    @PostMapping("/{token}/access")
    public ResponseEntity<Resource> accessPublicLinkFile(
            @PathVariable String token,
            @RequestBody(required = false) ShareDtos.AccessLinkRequest request) {
        String password = request != null ? request.getPassword() : null;
        Resource resource = publicLinkService.accessPublicLinkFile(token, password);
        ShareDtos.LinkShareDto info = publicLinkService.getPublicLinkInfo(token);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + info.getFileName() + "\"")
                .body(resource);
    }
}
