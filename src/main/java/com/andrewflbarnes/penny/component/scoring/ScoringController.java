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
        path = "scores/high"
)
@AllArgsConstructor
public class ScoringController {

    private HighScoreService highScoreService;

    @PostMapping(
            consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public Map<String, String> addHighScore(@RequestBody HighScore highScore) {
        String response = "OK";

        if (!highScoreService.addHighScore(highScore)) {
            response = String.format("Unable to add high score for user %s: %d", highScore.getName(), highScore.getScore());
        }

        return Collections.singletonMap("response", response);
    }

    @GetMapping
    public Object getHighScores(
            @RequestParam(name = "name", required = false) String name,
            @RequestParam(name = "count", required = false, defaultValue = "5") int count) {
        if (name != null && !name.isEmpty()) {
            return highScoreService.getUserHighScore(name);
        } else {
            return highScoreService.getHighScores(count);
        }
    }
}
