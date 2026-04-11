package com.jobtracker.note.repository;

import com.jobtracker.application.entity.JobApplication;
import com.jobtracker.note.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {

    List<Note> findByJobApplicationOrderByCreatedAtDesc(JobApplication jobApplication);
}