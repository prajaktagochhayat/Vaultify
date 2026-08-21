package com.cloudstorage.dto;

public class AuthDtos {

    public static class LoginRequest {
        private String email;
        private String password;

        public LoginRequest() {}
        public LoginRequest(String email, String password) {
            this.email = email;
            this.password = password;
        }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class RegisterRequest {
        private String fullName;
        private String email;
        private String password;

        public RegisterRequest() {}
        public RegisterRequest(String fullName, String email, String password) {
            this.fullName = fullName;
            this.email = email;
            this.password = password;
        }

        public String getFullName() { return fullName; }
        public void setFullName(String fullName) { this.fullName = fullName; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class AuthResponse {
        private String token;
        private UserDto user;

        public AuthResponse() {}
        public AuthResponse(String token, UserDto user) {
            this.token = token;
            this.user = user;
        }

        public String getToken() { return token; }
        public void setToken(String token) { this.token = token; }
        public UserDto getUser() { return user; }
        public void setUser(UserDto user) { this.user = user; }

        public static AuthResponseBuilder builder() { return new AuthResponseBuilder(); }
        public static class AuthResponseBuilder {
            private String token;
            private UserDto user;
            public AuthResponseBuilder token(String token) { this.token = token; return this; }
            public AuthResponseBuilder user(UserDto user) { this.user = user; return this; }
            public AuthResponse build() { return new AuthResponse(token, user); }
        }
    }

    public static class UserDto {
        private Long id;
        private String email;
        private String fullName;
        private String avatarUrl;
        private Long storageQuota;
        private Long storageUsed;
        private String role;

        public UserDto() {}
        public UserDto(Long id, String email, String fullName, String avatarUrl, Long storageQuota, Long storageUsed, String role) {
            this.id = id;
            this.email = email;
            this.fullName = fullName;
            this.avatarUrl = avatarUrl;
            this.storageQuota = storageQuota;
            this.storageUsed = storageUsed;
            this.role = role;
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getFullName() { return fullName; }
        public void setFullName(String fullName) { this.fullName = fullName; }
        public String getAvatarUrl() { return avatarUrl; }
        public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }
        public Long getStorageQuota() { return storageQuota; }
        public void setStorageQuota(Long storageQuota) { this.storageQuota = storageQuota; }
        public Long getStorageUsed() { return storageUsed; }
        public void setStorageUsed(Long storageUsed) { this.storageUsed = storageUsed; }
        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }

        public static UserDtoBuilder builder() { return new UserDtoBuilder(); }
        public static class UserDtoBuilder {
            private Long id;
            private String email;
            private String fullName;
            private String avatarUrl;
            private Long storageQuota;
            private Long storageUsed;
            private String role;

            public UserDtoBuilder id(Long id) { this.id = id; return this; }
            public UserDtoBuilder email(String email) { this.email = email; return this; }
            public UserDtoBuilder fullName(String fullName) { this.fullName = fullName; return this; }
            public UserDtoBuilder avatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; return this; }
            public UserDtoBuilder storageQuota(Long storageQuota) { this.storageQuota = storageQuota; return this; }
            public UserDtoBuilder storageUsed(Long storageUsed) { this.storageUsed = storageUsed; return this; }
            public UserDtoBuilder role(String role) { this.role = role; return this; }

            public UserDto build() {
                return new UserDto(id, email, fullName, avatarUrl, storageQuota, storageUsed, role);
            }
        }
    }
}
