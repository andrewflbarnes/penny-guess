package com.andrewflbarnes.penny.pages.highscoore;

import com.andrewflbarnes.penny.component.scoring.HighScoreService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

@Controller
@AllArgsConstructor
public class HighScorePage {

    private HighScoreService highScoreService;

    @RequestMapping("/highscores")
    public String index(Map<String, Object> model) {

        model.put("scores", highScoreService.getHighScores(1000));
        return "highscores";
    }
}
