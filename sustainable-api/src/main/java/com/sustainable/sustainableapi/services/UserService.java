package com.sustainable.sustainableapi.services;

import com.sustainable.sustainableapi.configs.security.JwtTokenProvider;
import com.sustainable.sustainableapi.exceptions.CustomException;
import com.sustainable.sustainableapi.exceptions.NotFoundException;
import com.sustainable.sustainableapi.model.dtos.SignInDto;
import com.sustainable.sustainableapi.model.dtos.TokenDto;
import com.sustainable.sustainableapi.model.dtos.UserDto;
import com.sustainable.sustainableapi.model.entities.User;
import com.sustainable.sustainableapi.model.enums.UserRole;
import com.sustainable.sustainableapi.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private AuthenticationManager authenticationManager;
    private JwtTokenProvider jwtTokenProvider;

    @Lazy
    @Autowired
    public void setAuthenticationManager(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @Lazy
    @Autowired
    public void setJwtTokenProvider(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    public List<UserDto> getUsers() {
        return userRepository.findAll().stream().map(User::toDto).toList();
    }

    public UserDto getUser(UUID id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User with id:" + id)).toDto();
    }

    public TokenDto signin(SignInDto signInDto) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signInDto.getUsername(), signInDto.getPassword()));
            User user = userRepository.findByUsername(signInDto.getUsername()).orElseThrow(() -> new NotFoundException("User with username: " + signInDto.getUsername()));
            String token = jwtTokenProvider.createToken(user);
            return new TokenDto(token);
        } catch (AuthenticationException e) {
            throw new CustomException("Invalid username/password supplied", HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    public TokenDto signup(UserDto userDto) {
        if (!userRepository.existsByUsername(userDto.getUsername())) {
            User user = userDto.toEntity();
            user.setUserRole(UserRole.ROLE_USER);
            user.setPassword(passwordEncoder.encode(userDto.getPassword()));
            user = userRepository.save(user);
            String token =  jwtTokenProvider.createToken(user);
            return new TokenDto(token);
        } else {
            throw new CustomException("Username is already in use", HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("No user found with username:" + username));

    }

    public UserDto updateUser(User user, UUID userId) {
        return null;
    }

    public void deleteUser(UUID userId) {
        getUser(userId);
        userRepository.deleteById(userId);
    }
}