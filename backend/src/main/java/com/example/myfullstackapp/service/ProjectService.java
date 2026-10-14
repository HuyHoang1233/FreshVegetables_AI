package com.example.myfullstackapp.service;

import com.example.myfullstackapp.dto.project.ProjectCreateRequest;
import com.example.myfullstackapp.dto.project.ProjectResponse;
import com.example.myfullstackapp.dto.project.ProjectUpdateRequest;
import com.example.myfullstackapp.entity.Project;
import com.example.myfullstackapp.exception.ResourceNotFoundException;
import com.example.myfullstackapp.mapper.ProjectMapper;
import com.example.myfullstackapp.repository.ProjectRepository;
import com.example.myfullstackapp.repository.UserRepository;
import com.example.myfullstackapp.security.AppUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final ProjectMapper projectMapper;

    @Transactional(readOnly = true)
    public List<ProjectResponse> getAll(AppUserDetails actor) {
        List<Project> projects = isAdmin(actor) ? projectRepository.findAll() : projectRepository.findByOwnerId(actor.getId());
        return projects.stream().map(projectMapper::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public ProjectResponse getById(UUID id, AppUserDetails actor) { return projectMapper.toResponse(authorizedProject(id, actor)); }

    @Transactional
    public ProjectResponse create(ProjectCreateRequest request, AppUserDetails actor) {
        var owner = userRepository.findById(actor.getId()).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Project project = Project.builder().name(request.name().trim()).description(request.description()).status(request.status()).owner(owner).build();
        return projectMapper.toResponse(projectRepository.save(project));
    }

    @Transactional
    public ProjectResponse update(UUID id, ProjectUpdateRequest request, AppUserDetails actor) {
        Project project = authorizedProject(id, actor);
        project.setName(request.name().trim());
        project.setDescription(request.description());
        project.setStatus(request.status());
        return projectMapper.toResponse(project);
    }

    @Transactional
    public void delete(UUID id, AppUserDetails actor) { projectRepository.delete(authorizedProject(id, actor)); }

    private Project authorizedProject(UUID id, AppUserDetails actor) {
        Project project = projectRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Project not found"));
        if (!isAdmin(actor) && !project.getOwner().getId().equals(actor.getId())) throw new AccessDeniedException("Project does not belong to current user");
        return project;
    }

    private boolean isAdmin(AppUserDetails actor) {
        return actor.getAuthorities().stream().anyMatch(authority -> "ROLE_ADMIN".equals(authority.getAuthority()));
    }
}
