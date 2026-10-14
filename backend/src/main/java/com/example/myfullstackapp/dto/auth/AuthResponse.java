package com.example.myfullstackapp.dto.auth;

import com.example.myfullstackapp.dto.user.UserResponse;

public record AuthResponse(String accessToken, String refreshToken, String tokenType, long expiresIn, UserResponse user) { }
