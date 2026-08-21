package com.cloudstorage.repository;

import com.cloudstorage.model.LinkShare;
import com.cloudstorage.model.FileItem;
import com.cloudstorage.model.Folder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface LinkShareRepository extends JpaRepository<LinkShare, Long> {
    Optional<LinkShare> findByToken(String token);
    List<LinkShare> findByFileItem(FileItem fileItem);
    List<LinkShare> findByFolder(Folder folder);
}
