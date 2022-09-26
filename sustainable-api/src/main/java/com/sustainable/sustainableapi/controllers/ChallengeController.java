package com.sustainable.sustainableapi.controllers;

import com.sustainable.sustainableapi.model.dtos.ChallengeDto;
import com.sustainable.sustainableapi.services.ChallengeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.UUID;

@RestController
@RequestMapping("api/v1/challenges")
public class ChallengeController {

    private final ChallengeService challengeService;

    public ChallengeController(ChallengeService challengeService) {
        this.challengeService = challengeService;
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/{challengeId}")
    public ChallengeDto getChallenge(@PathVariable UUID challengeId) {
        return challengeService.getChallenge(challengeId);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public ChallengeDto createChallenge(@RequestBody @Valid ChallengeDto challenge) {
        return challengeService.createChallenge(challenge);
    }

    @PutMapping(value = "/{challengeId}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ChallengeDto updateChallenge(@RequestBody ChallengeDto challenge,@PathVariable UUID challengeId){
        return challengeService.updateChallenge(challenge, challengeId);
    }

    @DeleteMapping("/{challengeId}")
    public void deleteChallenge(@PathVariable UUID challengeId) {
        challengeService.deleteChallenge(challengeId);
    }
}