package com.jobtracker.application.dto;

import com.jobtracker.application.entity.ApplicationStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Request payload for creating/updating a job application")
public class JobApplicationRequest {

    @Schema(description = "Company name", example = "Google")
    @NotBlank(message = "Company name is required")
    private String companyName;

    @Schema(description = "Job role/title", example = "Software Engineer")
    @NotBlank(message = "Job role is required")
    private String jobRole;

    @Schema(description = "Application status", example = "APPLIED")
    @NotNull(message = "Status is required")
    private ApplicationStatus status;

    @Schema(description = "Date when application was submitted", example = "2024-01-15")
    private LocalDate appliedDate;

    @Schema(description = "Link to job posting", example = "https://careers.google.com/jobs/123")
    private String jobLink;

    @Schema(description = "Job location", example = "Mountain View, CA")
    private String location;
}