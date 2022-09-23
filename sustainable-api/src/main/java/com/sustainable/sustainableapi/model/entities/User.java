package com.sustainable.sustainableapi.model.entities;

import com.sustainable.sustainableapi.model.dtos.UserDto;
import com.sustainable.sustainableapi.model.enums.UserRole;
import com.sustainable.sustainableapi.utils.Mapper;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users", indexes = {@Index(columnList = "username", unique = true)})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User extends AbstractEntity implements UserDetails {
    @Column(unique = true)
    private String username;
    private String emailAddress;
    private String password;

    @Enumerated(EnumType.STRING)
    private UserRole userRole;

    @ManyToMany(mappedBy = "participants")
    private List<Challenge> challenges;

    private boolean enabled = true;


    public UserDto toDto() {
        return Mapper.map(this, UserDto.class);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Set.of(userRole);
    }

    @Override
    public boolean isAccountNonExpired() {
        return enabled;
    }

    @Override
    public boolean isAccountNonLocked() {
        return enabled;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return enabled;
    }
}


