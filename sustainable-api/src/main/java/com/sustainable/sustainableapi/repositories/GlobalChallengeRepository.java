package com.sustainable.sustainableapi.repositories;

import com.sustainable.sustainableapi.model.entities.GlobalChallenge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;


@Repository
public interface GlobalChallengeRepository extends JpaRepository<GlobalChallenge, UUID> {
}
