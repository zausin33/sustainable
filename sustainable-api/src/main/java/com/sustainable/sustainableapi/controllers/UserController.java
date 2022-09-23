package com.sustainable.sustainableapi.controllers;

import com.sustainable.sustainableapi.model.dtos.SignInDto;
import com.sustainable.sustainableapi.model.dtos.TokenDto;
import com.sustainable.sustainableapi.model.dtos.UserDto;
import com.sustainable.sustainableapi.model.entities.User;
import com.sustainable.sustainableapi.services.UserService;
import com.sustainable.sustainableapi.utils.AuthorizationUtil;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/v1/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signin")
    public TokenDto login(@RequestBody @Valid SignInDto signInDto) {
        return userService.signin(signInDto);
    }

    @PostMapping("/signup")
    public TokenDto signup(@RequestBody @Valid UserDto user) {
        return userService.signup(user);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping
    public List<UserDto> getUsers(){
        return userService.getUsers();
    }

    @GetMapping("/{userId}")
    public UserDto getUser(@PathVariable UUID userId) {
        AuthorizationUtil.checkUserIsHimselfOrAdmin(userId);
        return userService.getUser(userId);
    }

    @PutMapping(value = "/{userId}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public UserDto updateUser(@RequestBody User user,@PathVariable UUID userId){
        AuthorizationUtil.checkUserIsHimselfOrAdmin(userId);
        return userService.updateUser(user, userId);
    }

    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable UUID userId) {
        AuthorizationUtil.checkUserIsHimselfOrAdmin(userId);
        userService.deleteUser(userId);
    }
}