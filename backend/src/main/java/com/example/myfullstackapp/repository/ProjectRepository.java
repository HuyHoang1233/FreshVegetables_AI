package com.example.myfullstackapp.repository;

import com.example.myfullstackapp.entity.Project;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProjectRepository extends JpaRepository<Project, UUID> {
    @Override @EntityGraph(attributePaths = "owner")
    Optional<Project> findById(UUID id);
    @EntityGraph(attributePaths = "owner")
    List<Project> findByOwnerId(UUID ownerId);
    @Override @EntityGraph(attributePaths = "owner")
    List<Project> findAll();
}
