package com.sustainable.sustainableapi.repositories;

import com.sustainable.sustainableapi.model.entities.Challenge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;


@Repository
public interface ChallengeRepository extends JpaRepository<Challenge, UUID> {
}
