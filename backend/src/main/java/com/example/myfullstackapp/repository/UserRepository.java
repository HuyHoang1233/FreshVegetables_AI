package com.example.myfullstackapp.repository;

import com.example.myfullstackapp.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    @EntityGraph(attributePaths = "roles")
    Optional<User> findByEmailIgnoreCase(String email);
    boolean existsByEmailIgnoreCase(String email);
    @Override @EntityGraph(attributePaths = "roles")
    Optional<User> findById(UUID id);
    @Override @EntityGraph(attributePaths = "roles")
    List<User> findAll();
}
