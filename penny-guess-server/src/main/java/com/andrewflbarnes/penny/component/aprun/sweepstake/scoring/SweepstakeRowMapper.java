package com.andrewflbarnes.penny.component.aprun.sweepstake.scoring;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class SweepstakeRowMapper implements RowMapper<SweepstakeEntry> {

    public SweepstakeEntry mapRow(ResultSet resultSet, int i) throws SQLException {
        return new SweepstakeEntry(
                resultSet.getString("name"),
                resultSet.getString("runner"),
                resultSet.getString("time"),
                resultSet.getString("message")
        );
    }
}
