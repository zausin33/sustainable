package com.sustainable.sustainableapi.services;

import com.sustainable.sustainableapi.exceptions.NotFoundException;
import com.sustainable.sustainableapi.model.dtos.UserDto;
import com.sustainable.sustainableapi.model.entities.User;
import com.sustainable.sustainableapi.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserDto> getUsers() {
        return userRepository.findAll().stream().map(User::toDto).toList();
    }

    public UserDto getUser(UUID id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User with id:" + id)).toDto();
    }

    public UserDto createUser(UserDto user) {
        return userRepository.save(user.toEntity()).toDto();
    }

    public UserDto updateUser(User user, UUID userId) {
        return null;
    }

    public void deleteUser(UUID userId) {
        getUser(userId);
        userRepository.deleteById(userId);
    }
}