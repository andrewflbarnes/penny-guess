package com.andrewflbarnes.penny.component.scoring;

import lombok.AllArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@AllArgsConstructor
public class JdbcHighScoreDAO implements  HighScoreDAO {

    private static final String SQL_INSERT_HIGH_SCORE = "INSERT INTO high_score(name, score) VALUES(?, ?)";
    private static final String SQL_UPDATE_HIGH_SCORE = "UPDATE high_score SET score = ? WHERE name = ?";
    private static final String SQL_SELECT_USER_SCORE = "SELECT * FROM high_score WHERE name = ?";
    private static final String SQL_SELECT_HIGH_SCORES = "SELECT * FROM high_score ORDER BY score DESC limit ?";

    private final RowMapper<HighScore> rowMapper = new HighScoreRowMapper();

    private JdbcTemplate jdbcTemplate;

    public boolean addHighScore(HighScore highScore) {
        return jdbcTemplate.update(
                SQL_INSERT_HIGH_SCORE,
                highScore.getName(), highScore.getScore()) > 0;
    }

    public HighScore getUserHighScore(String name) {
        try {
            return jdbcTemplate.queryForObject(
                    SQL_SELECT_USER_SCORE,
                    new Object[]{name},
                    rowMapper);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public boolean updateHighScore(HighScore highScore) {
        return jdbcTemplate.update(
                SQL_UPDATE_HIGH_SCORE,
                highScore.getScore(),
                highScore.getName()) > 0;
    }

    public List<HighScore> getHighScores(int count) {
        return jdbcTemplate.query(
                SQL_SELECT_HIGH_SCORES,
                new Object[]{count},
                rowMapper);
    }
}
