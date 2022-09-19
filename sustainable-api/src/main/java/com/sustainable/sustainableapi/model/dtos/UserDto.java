package com.sustainable.sustainableapi.model.dtos;

import com.sustainable.sustainableapi.model.entities.Challenge;
import com.sustainable.sustainableapi.model.entities.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private UUID userId;
    private String name;
    private String emailAddress;
    private List<Challenge> challenges;

    public User toEntity() {
        return new User(userId, name, emailAddress, null, challenges);
    }
}
