package com.sustainable.sustainableapi.services;

import com.sustainable.sustainableapi.exceptions.NotFoundException;
import com.sustainable.sustainableapi.model.entities.User;
import com.sustainable.sustainableapi.repositories.UserRepository;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.ArrayList;
import java.util.List;

public class CustomeUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomeUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
       User user = userRepository.findByName(username).orElseThrow(() -> new UsernameNotFoundException("No user found with username:" + username));
        return new org.springframework.security.core.userdetails.User(user.getName(), user.getPassword(), true, true, true, true, new ArrayList<GrantedAuthority>());

    }
}
