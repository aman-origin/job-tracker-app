package com.jobtracker.note.controller;

import com.jobtracker.note.dto.NoteRequest;
import com.jobtracker.note.dto.NoteResponse;
import com.jobtracker.note.service.NoteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/applications/{applicationId}/notes")
@RequiredArgsConstructor
@Tag(name = "Notes", description = "Notes for job applications")
@SecurityRequirement(name = "Bearer Authentication")
public class NoteController {

    private final NoteService noteService;

    @Operation(summary = "Add a note to an application")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Note created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid input"),
            @ApiResponse(responseCode = "401", description = "Unauthorized"),
            @ApiResponse(responseCode = "404", description = "Application not found")
    })
    @PostMapping
    public ResponseEntity<NoteResponse> create(
            @PathVariable Long applicationId,
            @Valid @RequestBody NoteRequest request) {
        NoteResponse response = noteService.create(applicationId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @Operation(summary = "Get all notes for an application")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Notes retrieved successfully"),
            @ApiResponse(responseCode = "401", description = "Unauthorized"),
            @ApiResponse(responseCode = "404", description = "Application not found")
    })
    @GetMapping
    public ResponseEntity<List<NoteResponse>> getAll(@PathVariable Long applicationId) {
        List<NoteResponse> notes = noteService.getAllByApplicationId(applicationId);
        return ResponseEntity.ok(notes);
    }
}