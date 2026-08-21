package com.cloudstorage.service;

import com.cloudstorage.dto.ActivityDtos;
import com.cloudstorage.model.ActivityLog;
import com.cloudstorage.model.User;
import com.cloudstorage.repository.ActivityLogRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ActivityService {

    private final ActivityLogRepository activityLogRepository;

    public ActivityService(ActivityLogRepository activityLogRepository) {
        this.activityLogRepository = activityLogRepository;
    }

    public void logActivity(User user, ActivityLog.ActionType action, String targetType, Long targetId, String targetName, String details) {
        ActivityLog log = ActivityLog.builder()
                .user(user)
                .action(action)
                .targetType(targetType)
                .targetId(targetId)
                .targetName(targetName)
                .details(details)
                .build();
        activityLogRepository.save(log);
    }

    public List<ActivityDtos.ActivityDto> getUserActivities(User user) {
        return activityLogRepository.findTop50ByUserOrderByTimestampDesc(user).stream()
                .map(log -> ActivityDtos.ActivityDto.builder()
                        .id(log.getId())
                        .userFullName(user.getFullName())
                        .userEmail(user.getEmail())
                        .action(log.getAction().name())
                        .targetType(log.getTargetType())
                        .targetId(log.getTargetId())
                        .targetName(log.getTargetName())
                        .details(log.getDetails())
                        .timestamp(log.getTimestamp())
                        .build())
                .collect(Collectors.toList());
    }
}
