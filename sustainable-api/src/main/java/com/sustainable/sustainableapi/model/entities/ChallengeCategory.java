package com.sustainable.sustainableapi.model.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChallengeCategory {
    @Id
    @GenericGenerator(name = "UUIDGenerator",strategy = "org.hibernate.id.UUIDGenerator")
    @GeneratedValue(generator = "UUIDGenerator")
    @Column(columnDefinition = "uuid")
    private UUID categoryId;
    private String name;
}
