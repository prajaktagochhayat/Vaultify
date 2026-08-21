package com.cloudstorage.repository;

import com.cloudstorage.model.ActivityLog;
import com.cloudstorage.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ActivityLogRepository extends JpaRepository<ActivityLog, Long> {
    List<ActivityLog> findTop50ByUserOrderByTimestampDesc(User user);
}
