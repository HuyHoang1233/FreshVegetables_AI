package com.example.myfullstackapp.repository;

import com.example.myfullstackapp.entity.RefreshToken;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, UUID> {
    @EntityGraph(attributePaths = {"user", "user.roles"})
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    Optional<RefreshToken> findByTokenIdAndRevokedFalse(UUID tokenId);
    Optional<RefreshToken> findByTokenId(UUID tokenId);
    void deleteByExpiresAtBefore(Instant time);
}
