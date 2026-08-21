package com.cloudstorage.repository;

import com.cloudstorage.model.Star;
import com.cloudstorage.model.User;
import com.cloudstorage.model.FileItem;
import com.cloudstorage.model.Folder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface StarRepository extends JpaRepository<Star, Long> {
    List<Star> findByUser(User user);
    Optional<Star> findByUserAndFileItem(User user, FileItem fileItem);
    Optional<Star> findByUserAndFolder(User user, Folder folder);
    void deleteByUserAndFileItem(User user, FileItem fileItem);
    void deleteByUserAndFolder(User user, Folder folder);
}
