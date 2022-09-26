package com.sustainable.sustainableapi.model.entities;

import com.sustainable.sustainableapi.model.dtos.GlobalChallengeDto;
import com.sustainable.sustainableapi.model.enums.Color;
import com.sustainable.sustainableapi.utils.Mapper;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "global_challenge")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GlobalChallenge extends AbstractEntity{

    private String name;

    @ManyToOne
    @JoinColumn(name = "category")
    private ChallengeCategory category;

    private boolean measurable;

    @Enumerated(EnumType.STRING)
    private Color color;

    private Long frequency;

    private String note;

    private String question;

    public GlobalChallengeDto toDto() {
        return Mapper.map(this, GlobalChallengeDto.class);
    }
}

