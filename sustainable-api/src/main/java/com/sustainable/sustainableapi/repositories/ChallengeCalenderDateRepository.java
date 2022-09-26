package com.sustainable.sustainableapi.repositories;

import com.sustainable.sustainableapi.model.entities.ChallengeCalendarDate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;


@Repository
public interface ChallengeCalenderDateRepository extends JpaRepository<ChallengeCalendarDate, UUID> {
    Page<ChallengeCalendarDate> findByChallengeId(UUID challengeId, Pageable pageable);
}
