package com.example.myfullstackapp.dto.user;

import com.example.myfullstackapp.entity.RoleName;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

import java.util.Set;

public record UserUpdateRequest(
        @NotBlank @Size(max = 120) String fullName,
        boolean active,
        @NotEmpty Set<RoleName> roles
) { }
