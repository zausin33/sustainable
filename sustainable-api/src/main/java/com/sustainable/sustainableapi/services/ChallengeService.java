package com.sustainable.sustainableapi.services;

import com.sustainable.sustainableapi.exceptions.NotFoundException;
import com.sustainable.sustainableapi.model.entities.Challenge;
import com.sustainable.sustainableapi.repositories.ChallengeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ChallengeService {
    private final ChallengeRepository challengeRepository;

    public ChallengeService(ChallengeRepository challengeRepository) {
        this.challengeRepository = challengeRepository;
    }

    public List<Challenge> getChallenge() {
        return challengeRepository.findAll();
    }

    public Challenge getChallenge(UUID id) {
        return challengeRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Challenge with id:" + id));
    }

    public Challenge createChallenge(Challenge challenge) {
        return challengeRepository.save(challenge);
    }

    public Challenge updateChallenge(Challenge challenge, UUID challengeId) {
        return null;
    }

    public void deleteChallenge(UUID challengeId) {
        getChallenge(challengeId);
        challengeRepository.deleteById(challengeId);
    }
}