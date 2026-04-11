package com.jobtracker.application.repository;

import com.jobtracker.application.entity.JobApplication;
import com.jobtracker.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {

    List<JobApplication> findByUserOrderByCreatedAtDesc(User user);

    Optional<JobApplication> findByIdAndUser(Long id, User user);

    boolean existsByIdAndUser(Long id, User user);
}