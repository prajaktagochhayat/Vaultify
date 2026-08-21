package com.cloudstorage.repository;

import com.cloudstorage.model.FileVersion;
import com.cloudstorage.model.FileItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FileVersionRepository extends JpaRepository<FileVersion, Long> {
    List<FileVersion> findByFileItemOrderByVersionNumberDesc(FileItem fileItem);
}
