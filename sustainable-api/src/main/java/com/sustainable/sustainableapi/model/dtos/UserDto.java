package com.sustainable.sustainableapi.model.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sustainable.sustainableapi.model.entities.Challenge;
import com.sustainable.sustainableapi.model.entities.User;
import com.sustainable.sustainableapi.model.enums.UserRole;
import com.sustainable.sustainableapi.utils.Mapper;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private UUID userId;

    @NotNull
    @NotEmpty
    private String username;

    @NotNull
    @NotEmpty
    private String emailAddress;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotNull
    @NotEmpty
    private String password;

    private UserRole userRole;

    private List<Challenge> challenges;

    public User toEntity() {
        return Mapper.map(this, User.class);
    }
}
