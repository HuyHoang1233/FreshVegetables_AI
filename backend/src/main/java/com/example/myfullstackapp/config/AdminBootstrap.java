package com.example.myfullstackapp.config;

import com.example.myfullstackapp.entity.Role;
import com.example.myfullstackapp.entity.RoleName;
import com.example.myfullstackapp.entity.User;
import com.example.myfullstackapp.exception.ResourceNotFoundException;
import com.example.myfullstackapp.repository.RoleRepository;
import com.example.myfullstackapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Locale;
import java.util.HashSet;
import java.util.Set;

/** Creates or promotes an explicitly configured first administrator without storing credentials in source. */
@Component
@RequiredArgsConstructor
public class AdminBootstrap implements ApplicationRunner {
    private final AppProperties properties;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        var settings = properties.getBootstrapAdmin();
        boolean hasEmail = StringUtils.hasText(settings.getEmail());
        boolean hasPassword = StringUtils.hasText(settings.getPassword());
        if (!hasEmail && !hasPassword) return;
        if (!hasEmail || !hasPassword || settings.getPassword().length() < 8) {
            throw new IllegalStateException("BOOTSTRAP_ADMIN_EMAIL and an 8+ character BOOTSTRAP_ADMIN_PASSWORD must be set together");
        }

        Role admin = roleRepository.findByName(RoleName.ADMIN)
                .orElseThrow(() -> new ResourceNotFoundException("Default ADMIN role is missing"));
        String email = settings.getEmail().trim().toLowerCase(Locale.ROOT);
        User user = userRepository.findByEmailIgnoreCase(email).orElseGet(() -> User.builder()
                .email(email)
                .fullName(StringUtils.hasText(settings.getFullName()) ? settings.getFullName().trim() : "Administrator")
                .passwordHash(passwordEncoder.encode(settings.getPassword()))
                .roles(new HashSet<>(Set.of(admin)))
                .build());
        if (!user.getRoles().contains(admin)) user.getRoles().add(admin);
        user.setActive(true);
        userRepository.save(user);
    }
}
