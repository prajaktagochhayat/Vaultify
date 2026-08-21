package com.cloudstorage.controller;

import com.cloudstorage.dto.DriveDtos;
import com.cloudstorage.model.User;
import com.cloudstorage.repository.UserRepository;
import com.cloudstorage.service.SearchService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class SearchController {

    private final SearchService searchService;
    private final UserRepository userRepository;

    public SearchController(SearchService searchService, UserRepository userRepository) {
        this.searchService = searchService;
        this.userRepository = userRepository;
    }

    private User getAuthenticatedUser(UserDetails userDetails) {
        return userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @GetMapping("/search")
    public ResponseEntity<DriveDtos.DriveSummaryResponse> search(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String type) {
        User user = getAuthenticatedUser(userDetails);
        return ResponseEntity.ok(searchService.search(user, q, type));
    }

    @GetMapping("/starred")
    public ResponseEntity<DriveDtos.DriveSummaryResponse> getStarredItems(
            @AuthenticationPrincipal UserDetails userDetails) {
        User user = getAuthenticatedUser(userDetails);
        return ResponseEntity.ok(searchService.getStarredItems(user));
    }

    @GetMapping("/trash")
    public ResponseEntity<DriveDtos.DriveSummaryResponse> getTrashedItems(
            @AuthenticationPrincipal UserDetails userDetails) {
        User user = getAuthenticatedUser(userDetails);
        return ResponseEntity.ok(searchService.getTrashedItems(user));
    }
}
