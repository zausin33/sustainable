package com.sustainable.sustainableapi.model.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChallengeCalendarDate extends AbstractEntity {

    private String name;

    private Date date;

    @ManyToOne
    @JoinColumn(name = "challenge_id")
    private Challenge challenge;

    private boolean accomplished;

    private int measure;
}

