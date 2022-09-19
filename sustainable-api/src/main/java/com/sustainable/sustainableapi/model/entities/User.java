package com.sustainable.sustainableapi.model.entities;

import com.sustainable.sustainableapi.model.dtos.UserDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GenericGenerator(name = "UUIDGenerator",strategy = "org.hibernate.id.UUIDGenerator")
    @GeneratedValue(generator = "UUIDGenerator")
    @Column(columnDefinition = "uuid")
    private UUID userId;
    private String name;
    private String emailAddress;

    private String password;

    @ManyToMany(mappedBy = "participants")
    private List<Challenge> challenges;

    public UserDto toDto() {
        return new UserDto(userId, name,emailAddress, challenges);
    }
}


