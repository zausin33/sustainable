package com.sustainable.sustainableapi.services;

import com.sustainable.sustainableapi.exceptions.NotFoundException;
import com.sustainable.sustainableapi.model.dtos.ChallengeDto;
import com.sustainable.sustainableapi.model.entities.Challenge;
import com.sustainable.sustainableapi.model.entities.ChallengeCalendarDate;
import com.sustainable.sustainableapi.model.entities.User;
import com.sustainable.sustainableapi.repositories.ChallengeCalenderDateRepository;
import com.sustainable.sustainableapi.repositories.ChallengeRepository;
import com.sustainable.sustainableapi.utils.AuthorizationUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.awt.print.Pageable;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ChallengeService {
    private final ChallengeRepository challengeRepository;

    private final ChallengeCalenderDateRepository challengeCalenderDateRepository;
    public ChallengeDto getChallenge(UUID id) {
        return challengeRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Challenge with id:" + id)).toDto();
    }

    public ChallengeDto createChallenge(ChallengeDto challengeDto) {
        Challenge challenge = challengeDto.toEntity();
        User currentUser = AuthorizationUtil.getCurrentUser();
        challenge.setParticipants(List.of(currentUser));
        return challengeRepository.save(challenge).toDto();
    }

    public ChallengeDto updateChallenge(ChallengeDto challenge, UUID challengeId) {
        return null;
    }

    public void deleteChallenge(UUID challengeId) {
        getChallenge(challengeId);
        challengeRepository.deleteById(challengeId);
    }

    public Object getCalenderDatesByChallenge(UUID challengeId, PageRequest pageRequest) {
        Page<ChallengeCalendarDate> byChallengeId = challengeCalenderDateRepository.findByChallengeId(challengeId, pageRequest);
        return byChallengeId;
    }
}