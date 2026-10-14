package com.example.myfullstackapp.service;

import com.example.myfullstackapp.entity.Role;
import com.example.myfullstackapp.entity.RoleName;
import com.example.myfullstackapp.entity.User;
import com.example.myfullstackapp.mapper.ProjectMapper;
import com.example.myfullstackapp.repository.ProjectRepository;
import com.example.myfullstackapp.repository.UserRepository;
import com.example.myfullstackapp.security.AppUserDetails;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Set;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

class ProjectServiceTest {
    @Test
    void regularUserOnlyReceivesOwnProjects() {
        ProjectRepository projects = mock(ProjectRepository.class);
        ProjectMapper mapper = mock(ProjectMapper.class);
        ProjectService service = new ProjectService(projects, mock(UserRepository.class), mapper);
        UUID userId = UUID.randomUUID();
        AppUserDetails user = principal(userId, RoleName.USER);
        when(projects.findByOwnerId(userId)).thenReturn(List.of());

        assertTrue(service.getAll(user).isEmpty());
        verify(projects).findByOwnerId(userId);
        verify(projects, never()).findAll();
    }

    @Test
    void adminReceivesAllProjects() {
        ProjectRepository projects = mock(ProjectRepository.class);
        ProjectMapper mapper = mock(ProjectMapper.class);
        ProjectService service = new ProjectService(projects, mock(UserRepository.class), mapper);
        when(projects.findAll()).thenReturn(List.of());

        assertTrue(service.getAll(principal(UUID.randomUUID(), RoleName.ADMIN)).isEmpty());
        verify(projects).findAll();
        verify(projects, never()).findByOwnerId(any());
    }

    private AppUserDetails principal(UUID id, RoleName role) {
        return new AppUserDetails(User.builder().id(id).email("user@example.com")
                .passwordHash("hash").roles(Set.of(Role.builder().id(1L).name(role).build())).build());
    }
}
