package com.sustainable.sustainableapi.model.entities;

import com.sustainable.sustainableapi.model.enums.Color;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.sql.Time;
import java.time.DayOfWeek;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Challenge {
    @Id
    @GenericGenerator(name = "UUIDGenerator",strategy = "org.hibernate.id.UUIDGenerator")
    @GeneratedValue(generator = "UUIDGenerator")
    @Column(columnDefinition = "uuid")
    private UUID challengeId;

    private String name;

    @ManyToOne
    @JoinColumn(name = "category")
    private ChallengeCategory category;

    private boolean measurable;

    @Enumerated(EnumType.STRING)
    private Color color;

    private Long frequency;

    @ManyToMany
    @JoinTable(name = "challenges_users",
            joinColumns = {@JoinColumn(name = "challenge_id")},
            inverseJoinColumns = {@JoinColumn(name = "user_id")})
    private List<User> participants;

    private Time alarm_time;

    private DayOfWeek alarm_day;

    private String note;

    //private boolean calendar_accomplishment;

    private Date startDate;

    private Date endDate;

    private int goal;

    private String unit;

    private String question;
}

