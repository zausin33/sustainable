package com.sustainable.sustainableapi.services;

import com.sustainable.sustainableapi.exceptions.NotFoundException;
import com.sustainable.sustainableapi.model.dtos.ChallengeDto;
import com.sustainable.sustainableapi.model.dtos.GlobalChallengeDto;
import com.sustainable.sustainableapi.model.entities.Challenge;
import com.sustainable.sustainableapi.model.entities.GlobalChallenge;
import com.sustainable.sustainableapi.model.entities.User;
import com.sustainable.sustainableapi.repositories.ChallengeRepository;
import com.sustainable.sustainableapi.repositories.GlobalChallengeRepository;
import com.sustainable.sustainableapi.utils.AuthorizationUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GlobalChallengeService {
    private final GlobalChallengeRepository globalChallengeRepository;
    private final ChallengeRepository challengeRepository;
    public GlobalChallengeDto getGlobalChallenge(UUID id) {
        return globalChallengeRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Challenge with id:" + id)).toDto();
    }

    public List<GlobalChallengeDto> getGlobalChallenges() {
            return globalChallengeRepository.findAll().stream().map(GlobalChallenge::toDto).toList();
    }

    public GlobalChallengeDto createGlobalChallenge(GlobalChallengeDto globalchallengeDto) {
        GlobalChallenge globalchallenge = globalchallengeDto.toEntity();
        return globalChallengeRepository.save(globalchallenge).toDto();
    }

    public GlobalChallengeDto updateGlobalChallenge(GlobalChallengeDto globalChallenge, UUID globalChallengeId) {
        return null;
    }

    public void deleteGlobalChallenge(UUID globalChallengeId) {
        getGlobalChallenge(globalChallengeId);
        globalChallengeRepository.deleteById(globalChallengeId);
    }

    public ChallengeDto acceptGlobalChallenge(UUID globalChallengeId) {
        GlobalChallengeDto globalChallenge = getGlobalChallenge(globalChallengeId);
        User currentUser = AuthorizationUtil.getCurrentUser();
        Challenge challenge = new Challenge(globalChallenge.getName(), globalChallenge.getCategory(),
                globalChallenge.isMeasurable(), globalChallenge.getColor(), globalChallenge.getFrequency(), List.of(currentUser), null, null, null, null, null, 0, null, null);
        challenge.setParticipants(List.of(currentUser));
        return challengeRepository.save(challenge).toDto();
    }
}