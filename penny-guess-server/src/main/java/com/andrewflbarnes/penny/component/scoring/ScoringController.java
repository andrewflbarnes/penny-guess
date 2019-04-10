package com.andrewflbarnes.penny.component.scoring;

import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(
        produces = MediaType.APPLICATION_JSON_VALUE,
        path = "api/scores/high"
)
@AllArgsConstructor
public class ScoringController {

    private HighScoreService highScoreService;

    @PostMapping(
            consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public Map<String, String> addHighScore(@RequestBody HighScore highScore) {
        String response;

        HighScore sanitised = HighScore.builder()
                .name(highScore.getName().trim())
                .score(highScore.getScore())
                .build();

        if (!highScoreService.addHighScore(sanitised)) {
            response = String.format("Unable to add high score: %s", sanitised);
        } else {
            response = String.format("Added high score: %s", sanitised);
        }

        return Collections.singletonMap("response", response);
    }

    @GetMapping
    public Object getHighScores(
            @RequestParam(name = "name", required = false) String name,
            @RequestParam(name = "count", required = false, defaultValue = "1000") int count) {
        if (name != null && !name.isEmpty()) {
            return highScoreService.getUserHighScore(name.trim());
        } else {
            return highScoreService.getHighScores(count);
        }
    }
}
