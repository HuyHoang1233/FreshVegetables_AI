package com.example.myfullstackapp.dto.user;

import java.util.UUID;

public record UserSummary(UUID id, String email, String fullName) { }
