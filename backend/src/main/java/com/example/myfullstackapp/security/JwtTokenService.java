package com.example.myfullstackapp.security;

import com.example.myfullstackapp.config.AppProperties;
import com.example.myfullstackapp.entity.User;
import com.example.myfullstackapp.exception.InvalidTokenException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.UUID;

@Service
public class JwtTokenService {
    private static final String TOKEN_TYPE = "token_type";
    private static final String ACCESS = "access";
    private static final String REFRESH = "refresh";

    private final AppProperties properties;
    private SecretKey signingKey;

    public JwtTokenService(AppProperties properties) {
        this.properties = properties;
    }

    @PostConstruct
    void initializeKey() {
        try {
            byte[] bytes = properties.getJwt().getSecret().getBytes(StandardCharsets.UTF_8);
            if (bytes.length < 32) throw new IllegalArgumentException("JWT secret must be at least 256 bits");
            signingKey = Keys.hmacShaKeyFor(bytes);
        } catch (IllegalArgumentException ex) {
            throw new IllegalStateException("JWT_SECRET must contain at least 32 random characters", ex);
        }
    }

    public String generateAccessToken(User user) {
        return createToken(user.getEmail(), ACCESS, null, properties.getJwt().getAccessTokenExpirationSeconds());
    }

    public String generateRefreshToken(User user, UUID tokenId) {
        return createToken(user.getEmail(), REFRESH, tokenId, properties.getJwt().getRefreshTokenExpirationSeconds());
    }

    public Claims parse(String token) {
        try {
            return Jwts.parser().verifyWith(signingKey).build().parseSignedClaims(token).getPayload();
        } catch (io.jsonwebtoken.JwtException | IllegalArgumentException ex) {
            throw new InvalidTokenException("Invalid or expired token");
        }
    }

    public Claims parseRefreshToken(String token) {
        Claims claims = parse(token);
        if (!REFRESH.equals(claims.get(TOKEN_TYPE, String.class))) throw new InvalidTokenException("Expected refresh token");
        return claims;
    }

    public boolean isValidAccessToken(String token, String email) {
        try {
            Claims claims = parse(token);
            return ACCESS.equals(claims.get(TOKEN_TYPE, String.class)) && email.equalsIgnoreCase(claims.getSubject());
        } catch (InvalidTokenException ex) {
            return false;
        }
    }

    private String createToken(String subject, String type, UUID tokenId, long seconds) {
        Instant now = Instant.now();
        var builder = Jwts.builder()
                .subject(subject)
                .claim(TOKEN_TYPE, type)
                .issuedAt(Date.from(now))
                .expiration(Date.from(now.plusSeconds(seconds)))
                .signWith(signingKey);
        if (tokenId != null) builder.id(tokenId.toString());
        return builder.compact();
    }
}
