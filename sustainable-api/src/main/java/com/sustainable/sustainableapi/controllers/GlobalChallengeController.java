package com.sustainable.sustainableapi.controllers;

import com.sustainable.sustainableapi.model.dtos.ChallengeDto;
import com.sustainable.sustainableapi.model.dtos.GlobalChallengeDto;
import com.sustainable.sustainableapi.model.entities.GlobalChallenge;
import com.sustainable.sustainableapi.services.GlobalChallengeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/v1/global-challenges")
public class GlobalChallengeController {

    private final GlobalChallengeService globalchallengeService;

    public GlobalChallengeController(GlobalChallengeService globalchallengeService) {
        this.globalchallengeService = globalchallengeService;
    }

    @GetMapping
    public List<GlobalChallengeDto> getGlobalChallenges(){
        return globalchallengeService.getGlobalChallenges();
    }


    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public GlobalChallengeDto createChallenge(@RequestBody @Valid GlobalChallengeDto globalChallenge) {
        return globalchallengeService.createGlobalChallenge(globalChallenge);
    }

    @PostMapping("/{globalChallengeId}")
    public ChallengeDto acceptGlobalChallenge(@PathVariable UUID globalChallengeId){
        return globalchallengeService.acceptGlobalChallenge(globalChallengeId);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping(value = "/{globalChallengeId}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public GlobalChallengeDto updateChallenge(@RequestBody GlobalChallengeDto globalChallenge, @PathVariable UUID globalChallengeId){
        return globalchallengeService.updateGlobalChallenge(globalChallenge, globalChallengeId);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{globalChallengeId}")
    public void deleteChallenge(@PathVariable UUID globalChallengeId) {
        globalchallengeService.deleteGlobalChallenge(globalChallengeId);
    }
}