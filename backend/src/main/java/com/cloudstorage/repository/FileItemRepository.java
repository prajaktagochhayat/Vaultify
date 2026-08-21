package com.cloudstorage.repository;

import com.cloudstorage.model.FileItem;
import com.cloudstorage.model.Folder;
import com.cloudstorage.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface FileItemRepository extends JpaRepository<FileItem, Long> {
    List<FileItem> findByOwnerAndFolderAndIsTrashed(User owner, Folder folder, boolean isTrashed);
    List<FileItem> findByOwnerAndFolderIsNullAndIsTrashed(User owner, boolean isTrashed);
    List<FileItem> findByOwnerAndIsTrashed(User owner, boolean isTrashed);
    List<FileItem> findByOwnerAndIsStarredAndIsTrashed(User owner, boolean isStarred, boolean isTrashed);
    List<FileItem> findByNameContainingIgnoreCaseAndOwnerAndIsTrashed(String query, User owner, boolean isTrashed);
    List<FileItem> findByMimeTypeStartingWithAndOwnerAndIsTrashed(String mimePrefix, User owner, boolean isTrashed);
    Optional<FileItem> findByIdAndOwner(Long id, User owner);
}
