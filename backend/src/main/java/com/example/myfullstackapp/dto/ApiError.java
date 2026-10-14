package com.example.myfullstackapp.dto;

import java.time.Instant;
import java.util.List;

public record ApiError(boolean success, String message, String errorCode, Instant timestamp, List<String> details) {
    public static ApiError of(String message, String errorCode, List<String> details) {
        return new ApiError(false, message, errorCode, Instant.now(), details == null ? List.of() : details);
    }
}
