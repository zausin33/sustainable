package com.sustainable.sustainableapi.controllers;

import com.sustainable.sustainableapi.model.entities.Challenge;
import com.sustainable.sustainableapi.services.ChallengeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/v1/challenges")
public class ChallengeController {

    private final ChallengeService challengeService;

    public ChallengeController(ChallengeService challengeService) {
        this.challengeService = challengeService;
    }

    @GetMapping
    public List<Challenge> getChallenges(){
        return challengeService.getChallenge();
    }

    @GetMapping("/{challengeId}")
    public Challenge getChallenge(@PathVariable UUID challengeId) {
        return challengeService.getChallenge(challengeId);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Challenge createChallenge(@RequestBody Challenge challenge) {
        return challengeService.createChallenge(challenge);
    }

    @PutMapping(value = "/{challengeId}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Challenge updateChallenge(@RequestBody Challenge challenge,@PathVariable UUID challengeId){
        return challengeService.updateChallenge(challenge, challengeId);
    }

    @DeleteMapping("/{challengeId}")
    public void deleteChallenge(@PathVariable UUID challengeId) {
        challengeService.deleteChallenge(challengeId);
    }
}