package com.jobtracker.note.mapper;

import com.jobtracker.note.dto.NoteRequest;
import com.jobtracker.note.dto.NoteResponse;
import com.jobtracker.note.entity.Note;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring")
public interface NoteMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "jobApplication", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    Note toEntity(NoteRequest request);

    @Mapping(target = "applicationId", source = "jobApplication.id")
    NoteResponse toResponse(Note entity);

    List<NoteResponse> toResponseList(List<Note> entities);
}