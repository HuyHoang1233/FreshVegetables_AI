package com.example.myfullstackapp.dto.project;

import com.example.myfullstackapp.entity.ProjectStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ProjectUpdateRequest(
        @NotBlank @Size(max = 160) String name,
        @Size(max = 5000) String description,
        @NotNull ProjectStatus status
) { }
