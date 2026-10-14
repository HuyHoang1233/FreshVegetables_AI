package com.example.myfullstackapp.util;

public final class ValidationPatterns {
    private ValidationPatterns() { }
    public static final String PASSWORD = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{8,72}$";
    public static final String PASSWORD_MESSAGE = "Password must contain upper- and lower-case letters, a number, and a special character";
}
