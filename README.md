# Cloud Based Meta File Storage Service (Google Drive Clone)

A full-stack, enterprise-ready cloud file storage and sharing web application built with **Java 17 (Spring Boot 3)** on the backend and **React (Vite + Tailwind CSS)** on the frontend.

## 🚀 Features

### Core Features
- 🔐 **Authentication & Security**: Email + Password registration/login with stateless JWT Tokens, BCrypt password hashing, and role-based authorization.
- 📁 **Folder & File Management**: Hierarchical nested folders, file uploads (up to 100MB+), download streams, renaming, moving, and file version history.
- 👥 **User-to-User Sharing**: Fine-grained access control with `VIEWER` (read-only) and `EDITOR` roles.
- 🔗 **Public Link Sharing**: Shareable URLs with optional expiration dates and BCrypt password protection.
- 🔍 **Search & Filtering**: Real-time search across files/folders and filter by file types (Images, Video, Audio, PDF, Text, Code).
- ⭐ **Starred Items**: Quick access to starred files and folders.
- 🗑️ **Trash & Recovery**: Soft delete items with instant restore or permanent deletion.
- 👁️ **Interactive Previews**: Built-in previewers for Images, Videos, Audio, PDFs, and Code/Text files.
- 📊 **Storage Quota & Activity Audit**: Storage usage meter (5GB default) and real-time audit trail log.

---

## 🛠️ System Architecture & Technology Stack

- **Backend**: Java 17+, Spring Boot 3, Spring Security (JWT), Spring Data JPA, H2 Database (In-Memory for zero-config run) / PostgreSQL support, Local Disk Storage Provider (pluggable AWS S3 support).
- **Frontend**: React 18, Vite, Tailwind CSS, Lucide React Icons, React Dropzone, Axios.

---

## 💻 How to Run Locally

### Prerequisites
- Node.js (v18+)
- Java JDK 17+

### 1. Start Backend (Spring Boot)
```bash
cd backend
mvn spring-boot:run
# Backend API will start at http://localhost:8080
# H2 Database Console available at http://localhost:8080/h2-console
```

### 2. Start Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
# App will start at http://localhost:3000
```
