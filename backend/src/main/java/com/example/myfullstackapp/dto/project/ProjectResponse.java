package com.example.myfullstackapp.dto.project;

import com.example.myfullstackapp.dto.user.UserSummary;
import com.example.myfullstackapp.entity.ProjectStatus;

import java.time.Instant;
import java.util.UUID;

public record ProjectResponse(UUID id, String name, String description, ProjectStatus status, UserSummary owner,
                              Instant createdAt, Instant updatedAt) { }
