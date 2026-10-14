package com.example.myfullstackapp.security;

import com.example.myfullstackapp.config.AppProperties;
import com.example.myfullstackapp.entity.User;
import com.example.myfullstackapp.exception.InvalidTokenException;
import org.junit.jupiter.api.Test;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

class JwtTokenServiceTest {
    private JwtTokenService tokens() {
        AppProperties properties = new AppProperties();
        properties.getJwt().setSecret("MDEyMzQ1Njc4OWFiY2RlZjAxMjM0NTY3ODlhYmNkZWY=");
        JwtTokenService service = new JwtTokenService(properties);
        service.initializeKey();
        return service;
    }

    @Test
    void accessTokenRoundTripsForItsSubject() {
        JwtTokenService service = tokens();
        User user = User.builder().email("person@example.com").build();
        String token = service.generateAccessToken(user);

        assertTrue(service.isValidAccessToken(token, "person@example.com"));
        assertEquals("person@example.com", service.parse(token).getSubject());
    }

    @Test
    void refreshOnlyParserRejectsAccessTokens() {
        JwtTokenService service = tokens();
        String accessToken = service.generateAccessToken(User.builder().email("person@example.com").build());
        assertThrows(InvalidTokenException.class, () -> service.parseRefreshToken(accessToken));
        assertNotNull(service.parseRefreshToken(service.generateRefreshToken(User.builder().email("person@example.com").build(), UUID.randomUUID())).getId());
    }
}
