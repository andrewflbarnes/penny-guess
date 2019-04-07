package com.andrewflbarnes.penny.component.scoring;

import java.util.List;

public interface HighScoreDAO {

    boolean addHighScore(HighScore highScore);

    boolean updateHighScore(HighScore highScore);

    HighScore getUserHighScore(String name);

    List<HighScore> getHighScores(int count);
}
