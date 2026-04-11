package com.jobtracker.application.mapper;

import com.jobtracker.application.dto.JobApplicationRequest;
import com.jobtracker.application.dto.JobApplicationResponse;
import com.jobtracker.application.entity.JobApplication;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring")
public interface JobApplicationMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "notes", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    JobApplication toEntity(JobApplicationRequest request);

    @Mapping(target = "notesCount", expression = "java(entity.getNotes() != null ? entity.getNotes().size() : 0)")
    JobApplicationResponse toResponse(JobApplication entity);

    List<JobApplicationResponse> toResponseList(List<JobApplication> entities);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "notes", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    void updateEntityFromRequest(JobApplicationRequest request, @MappingTarget JobApplication entity);
}