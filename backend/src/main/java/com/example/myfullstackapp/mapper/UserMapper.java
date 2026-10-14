package com.example.myfullstackapp.mapper;

import com.example.myfullstackapp.dto.user.UserResponse;
import com.example.myfullstackapp.dto.user.UserSummary;
import com.example.myfullstackapp.entity.Role;
import com.example.myfullstackapp.entity.RoleName;
import com.example.myfullstackapp.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "roles", expression = "java(toRoleNames(user.getRoles()))")
    UserResponse toResponse(User user);
    UserSummary toSummary(User user);

    default Set<RoleName> toRoleNames(Set<Role> roles) {
        return roles.stream().map(Role::getName).collect(Collectors.toUnmodifiableSet());
    }
}
