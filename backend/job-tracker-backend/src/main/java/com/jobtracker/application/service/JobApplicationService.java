package com.jobtracker.application.service;

import com.jobtracker.application.dto.JobApplicationRequest;
import com.jobtracker.application.dto.JobApplicationResponse;
import com.jobtracker.application.entity.JobApplication;
import com.jobtracker.application.mapper.JobApplicationMapper;
import com.jobtracker.application.repository.JobApplicationRepository;
import com.jobtracker.common.exception.ResourceNotFoundException;
import com.jobtracker.common.exception.UnauthorizedException;
import com.jobtracker.user.entity.User;
import com.jobtracker.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JobApplicationService {

    private final JobApplicationRepository applicationRepository;
    private final JobApplicationMapper applicationMapper;
    private final UserService userService;

    @Transactional
    public JobApplicationResponse create(JobApplicationRequest request) {
        User currentUser = userService.getCurrentUser();

        JobApplication application = applicationMapper.toEntity(request);
        application.setUser(currentUser);

        JobApplication saved = applicationRepository.save(application);
        return applicationMapper.toResponse(saved);
    }

    @Transactional(readOnly = true)
    public List<JobApplicationResponse> getAllForCurrentUser() {
        User currentUser = userService.getCurrentUser();
        List<JobApplication> applications = applicationRepository.findByUserOrderByCreatedAtDesc(currentUser);
        return applicationMapper.toResponseList(applications);
    }

    @Transactional(readOnly = true)
    public JobApplicationResponse getById(Long id) {
        User currentUser = userService.getCurrentUser();
        JobApplication application = findApplicationForUser(id, currentUser);
        return applicationMapper.toResponse(application);
    }

    @Transactional
    public JobApplicationResponse update(Long id, JobApplicationRequest request) {
        User currentUser = userService.getCurrentUser();
        JobApplication application = findApplicationForUser(id, currentUser);

        applicationMapper.updateEntityFromRequest(request, application);
        JobApplication updated = applicationRepository.save(application);

        return applicationMapper.toResponse(updated);
    }

    @Transactional
    public void delete(Long id) {
        User currentUser = userService.getCurrentUser();
        JobApplication application = findApplicationForUser(id, currentUser);
        applicationRepository.delete(application);
    }

    /**
     * Helper method to find application and verify ownership
     */
    private JobApplication findApplicationForUser(Long id, User user) {
        return applicationRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResourceNotFoundException("Job Application", id));
    }

    /**
     * Internal method used by NoteService
     */
    @Transactional(readOnly = true)
    public JobApplication getEntityById(Long id) {
        User currentUser = userService.getCurrentUser();
        return findApplicationForUser(id, currentUser);
    }
}