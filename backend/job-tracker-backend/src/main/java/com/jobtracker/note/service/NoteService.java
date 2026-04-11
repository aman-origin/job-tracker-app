package com.jobtracker.note.service;

import com.jobtracker.application.entity.JobApplication;
import com.jobtracker.application.service.JobApplicationService;
import com.jobtracker.note.dto.NoteRequest;
import com.jobtracker.note.dto.NoteResponse;
import com.jobtracker.note.entity.Note;
import com.jobtracker.note.mapper.NoteMapper;
import com.jobtracker.note.repository.NoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NoteService {

    private final NoteRepository noteRepository;
    private final NoteMapper noteMapper;
    private final JobApplicationService applicationService;

    @Transactional
    public NoteResponse create(Long applicationId, NoteRequest request) {
        // This also verifies that the application belongs to the current user
        JobApplication application = applicationService.getEntityById(applicationId);

        Note note = noteMapper.toEntity(request);
        note.setJobApplication(application);

        Note saved = noteRepository.save(note);
        return noteMapper.toResponse(saved);
    }

    @Transactional(readOnly = true)
    public List<NoteResponse> getAllByApplicationId(Long applicationId) {
        // Verify access rights
        JobApplication application = applicationService.getEntityById(applicationId);

        List<Note> notes = noteRepository.findByJobApplicationOrderByCreatedAtDesc(application);
        return noteMapper.toResponseList(notes);
    }
}