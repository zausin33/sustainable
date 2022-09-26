package com.sustainable.sustainableapi.model.dtos;

import com.sustainable.sustainableapi.model.entities.ChallengeCategory;
import com.sustainable.sustainableapi.model.entities.GlobalChallenge;
import com.sustainable.sustainableapi.model.enums.Color;
import com.sustainable.sustainableapi.utils.Mapper;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.UUID;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GlobalChallengeDto {

    private UUID id;

    @NotNull
    @NotEmpty
    private String name;

    private ChallengeCategory category;

    @NotNull
    private boolean measurable;

    @NotNull
    private Color color;

    @NotNull
    private Long frequency;

    private String note;

    public GlobalChallenge toEntity() {
        return Mapper.map(this, GlobalChallenge.class);
    }
}

