package com.cloudstorage.repository;

import com.cloudstorage.model.Folder;
import com.cloudstorage.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface FolderRepository extends JpaRepository<Folder, Long> {
    List<Folder> findByOwnerAndParentAndIsTrashed(User owner, Folder parent, boolean isTrashed);
    List<Folder> findByOwnerAndParentIsNullAndIsTrashed(User owner, boolean isTrashed);
    List<Folder> findByOwnerAndIsTrashed(User owner, boolean isTrashed);
    List<Folder> findByOwnerAndIsStarredAndIsTrashed(User owner, boolean isStarred, boolean isTrashed);
    List<Folder> findByNameContainingIgnoreCaseAndOwnerAndIsTrashed(String query, User owner, boolean isTrashed);
    Optional<Folder> findByIdAndOwner(Long id, User owner);
}
