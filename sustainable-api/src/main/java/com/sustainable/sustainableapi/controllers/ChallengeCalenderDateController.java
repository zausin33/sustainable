package com.sustainable.sustainableapi.controllers;

import com.sustainable.sustainableapi.services.ChallengeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("api/v1/challenge-calender-dates")
@RequiredArgsConstructor
public class ChallengeCalenderDateController {
    private final ChallengeService challengeService;

    @GetMapping("/{challengeId}")
    public Object getCalenderDatesByChallenge(@PathVariable UUID challengeId,
                                              @RequestParam(defaultValue = "0") int page,
                                              @RequestParam(defaultValue = "10") int size)
    {
        PageRequest pageRequest = PageRequest.of(page, size);
        return challengeService.getCalenderDatesByChallenge(challengeId, pageRequest);
    }

}
