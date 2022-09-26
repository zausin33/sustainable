package com.sustainable.sustainableapi.model.dtos;

import com.sustainable.sustainableapi.model.entities.Challenge;
import com.sustainable.sustainableapi.model.entities.ChallengeCategory;
import com.sustainable.sustainableapi.model.entities.User;
import com.sustainable.sustainableapi.model.enums.Color;
import com.sustainable.sustainableapi.utils.Mapper;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;


import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.sql.Time;
import java.time.DayOfWeek;
import java.util.Date;
import java.util.List;
import java.util.UUID;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChallengeDto {

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

    private Time alarm_time;

    private DayOfWeek alarm_day;

    private String note;

    private Date startDate;

    private Date endDate;

    private int goal;

    private String unit;

    private String question;

    public Challenge toEntity() {
        return Mapper.map(this, Challenge.class);
    }
}

