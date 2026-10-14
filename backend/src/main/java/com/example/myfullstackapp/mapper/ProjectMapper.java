package com.example.myfullstackapp.mapper;

import com.example.myfullstackapp.dto.project.ProjectResponse;
import com.example.myfullstackapp.entity.Project;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = UserMapper.class)
public interface ProjectMapper {
    ProjectResponse toResponse(Project project);
}
