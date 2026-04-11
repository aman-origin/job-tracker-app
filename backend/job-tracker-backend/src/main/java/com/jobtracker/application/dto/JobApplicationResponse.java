package com.jobtracker.application.dto;

import com.jobtracker.application.entity.ApplicationStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Job application response")
public class JobApplicationResponse {

    @Schema(description = "Application ID")
    private Long id;

    @Schema(description = "Company name")
    private String companyName;

    @Schema(description = "Job role/title")
    private String jobRole;

    @Schema(description = "Application status")
    private ApplicationStatus status;

    @Schema(description = "Date when application was submitted")
    private LocalDate appliedDate;

    @Schema(description = "Link to job posting")
    private String jobLink;

    @Schema(description = "Job location")
    private String location;

    @Schema(description = "Creation timestamp")
    private LocalDateTime createdAt;

    @Schema(description = "Last update timestamp")
    private LocalDateTime updatedAt;

    @Schema(description = "Number of notes")
    private int notesCount;
}