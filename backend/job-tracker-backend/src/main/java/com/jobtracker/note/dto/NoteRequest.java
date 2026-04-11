package com.jobtracker.note.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Request payload for creating a note")
public class NoteRequest {

    @Schema(description = "Note content", example = "Had a great phone screen with the hiring manager.")
    @NotBlank(message = "Content is required")
    private String content;
}