package com.andrewflbarnes.penny.component.scoring;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class HighScoreRowMapper implements RowMapper<HighScore> {

    public HighScore mapRow(ResultSet resultSet, int i) throws SQLException {
        return new HighScore(
                resultSet.getString("name"),
                resultSet.getInt("score")
        );
    }
}
