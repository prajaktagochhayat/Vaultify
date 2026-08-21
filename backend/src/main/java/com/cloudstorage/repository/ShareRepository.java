package com.cloudstorage.repository;

import com.cloudstorage.model.Share;
import com.cloudstorage.model.User;
import com.cloudstorage.model.FileItem;
import com.cloudstorage.model.Folder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ShareRepository extends JpaRepository<Share, Long> {
    List<Share> findBySharedWithUser(User user);
    List<Share> findByCreatedBy(User user);
    Optional<Share> findByFileItemAndSharedWithUser(FileItem fileItem, User user);
    Optional<Share> findByFolderAndSharedWithUser(Folder folder, User user);
    List<Share> findByFileItem(FileItem fileItem);
    List<Share> findByFolder(Folder folder);
}
