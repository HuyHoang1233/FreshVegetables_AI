package com.example.myfullstackapp.controller;

import com.example.myfullstackapp.dto.ApiResponse;
import com.example.myfullstackapp.dto.project.ProjectCreateRequest;
import com.example.myfullstackapp.dto.project.ProjectResponse;
import com.example.myfullstackapp.dto.project.ProjectUpdateRequest;
import com.example.myfullstackapp.security.AppUserDetails;
import com.example.myfullstackapp.service.ProjectService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/projects")
@RequiredArgsConstructor
public class ProjectController {
    private final ProjectService projectService;

    @GetMapping
    public ApiResponse<List<ProjectResponse>> getAll(@AuthenticationPrincipal AppUserDetails actor) {
        return ApiResponse.ok("Projects retrieved", projectService.getAll(actor));
    }

    @GetMapping("/{id}")
    public ApiResponse<ProjectResponse> getById(@PathVariable UUID id, @AuthenticationPrincipal AppUserDetails actor) {
        return ApiResponse.ok("Project retrieved", projectService.getById(id, actor));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ProjectResponse>> create(@Valid @RequestBody ProjectCreateRequest request,
                                                                @AuthenticationPrincipal AppUserDetails actor) {
        ProjectResponse project = projectService.create(request, actor);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(project.id()).toUri();
        return ResponseEntity.created(location).body(ApiResponse.ok("Project created", project));
    }

    @PutMapping("/{id}")
    public ApiResponse<ProjectResponse> update(@PathVariable UUID id, @Valid @RequestBody ProjectUpdateRequest request,
                                               @AuthenticationPrincipal AppUserDetails actor) {
        return ApiResponse.ok("Project updated", projectService.update(id, request, actor));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable UUID id, @AuthenticationPrincipal AppUserDetails actor) {
        projectService.delete(id, actor);
    }
}
