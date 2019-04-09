package com.andrewflbarnes.penny.component.scoring;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class HighScoreService {

    private HighScoreDAO highScoreDAO;

    public HighScore getUserHighScore(String name) {
        return highScoreDAO.getUserHighScore(name);
    }

    @Transactional(isolation = Isolation.SERIALIZABLE)
    public boolean addHighScore(HighScore highScore) {
        final HighScore currentHighScore = highScoreDAO.getUserHighScore(highScore.getName());

        if (currentHighScore == null) {
            return highScoreDAO.addHighScore(highScore);
        } else if (currentHighScore.getScore() < highScore.getScore()) {
            return highScoreDAO.updateHighScore(highScore);
        }

        return false;
    }

    public List<HighScore> getHighScores(int count) {
        return highScoreDAO.getHighScores(count);
    }
}
