package com.jobtracker.note.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Note response")
public class NoteResponse {

    @Schema(description = "Note ID")
    private Long id;

    @Schema(description = "Note content")
    private String content;

    @Schema(description = "Creation timestamp")
    private LocalDateTime createdAt;

    @Schema(description = "Associated application ID")
    private Long applicationId;
}