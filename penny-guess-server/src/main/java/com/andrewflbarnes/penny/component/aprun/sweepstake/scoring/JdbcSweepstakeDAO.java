package com.andrewflbarnes.penny.component.aprun.sweepstake.scoring;

import lombok.AllArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@AllArgsConstructor
public class JdbcSweepstakeDAO implements SweepstakeDAO {

    private static final String SQL_INSERT_SWEEPSTAKE = "INSERT INTO t_aprun_sweepstake(name, runner, time, message) VALUES(?, ?, ?, ?)";
    private static final String SQL_SELECT_USER_SWEEPSTAKE = "SELECT * FROM t_aprun_sweepstake WHERE name = ?";
    private static final String SQL_SELECT_SWEEPSTAKES = "SELECT * FROM t_aprun_sweepstake ORDER BY time DESC limit ?";

    private final RowMapper<SweepstakeEntry> rowMapper = new SweepstakeRowMapper();

    private JdbcTemplate jdbcTemplate;

    public boolean addSweepstake(SweepstakeEntry sweepstakeEntry) {
        return jdbcTemplate.update(
                SQL_INSERT_SWEEPSTAKE,
                sweepstakeEntry.getName(), sweepstakeEntry.getRunner(), sweepstakeEntry.getTime(), sweepstakeEntry.getMessage()) > 0;
    }

    public SweepstakeEntry getSweepstake(String name) {
        try {
            return jdbcTemplate.queryForObject(
                    SQL_SELECT_USER_SWEEPSTAKE,
                    new Object[]{name},
                    rowMapper);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public List<SweepstakeEntry> getSweepstakes(int count) {
        return jdbcTemplate.query(
                SQL_SELECT_SWEEPSTAKES,
                new Object[]{count},
                rowMapper);
    }
}
