package com.andrewflbarnes.penny.component.aprun.sweepstake.scoring;

import com.andrewflbarnes.penny.util.Utils;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@AllArgsConstructor
@Slf4j
public class JdbcSweepstakeDAO implements SweepstakeDAO {

    private static final String SQL_INSERT_SWEEPSTAKE =
            Utils.loadResourceContents("sql/postgres/sweepstake_insert.sql");
    private static final String SQL_SELECT_USER_SWEEPSTAKE =
            Utils.loadResourceContents("sql/postgres/sweepstake_select_by_user.sql");
    private static final String SQL_SELECT_SWEEPSTAKES =
            Utils.loadResourceContents("sql/postgres/sweepstake_select_all.sql");

    private final RowMapper<SweepstakeEntry> rowMapper = new SweepstakeRowMapper();

    private JdbcTemplate jdbcTemplate;

    public boolean addSweepstake(SweepstakeEntry sweepstakeEntry) {
        log.debug("Persisting sweepstake entry {}", sweepstakeEntry);
        return jdbcTemplate.update(
                SQL_INSERT_SWEEPSTAKE,
                sweepstakeEntry.getName(),
                sweepstakeEntry.getRunner(),
                sweepstakeEntry.getTime(),
                sweepstakeEntry.getMessage(),
                sweepstakeEntry.getContact()) > 0;
    }

    public SweepstakeEntry getSweepstake(String name) {
        try {
            log.debug("Retrieving sweepstake entry for {}", name);
            return jdbcTemplate.queryForObject(
                    SQL_SELECT_USER_SWEEPSTAKE,
                    new Object[]{name},
                    rowMapper);
        } catch (EmptyResultDataAccessException e) {
            log.debug("No sweepstake entry found for {}", name);
            return null;
        }
    }

    public List<SweepstakeEntry> getSweepstakes(int count) {
        log.debug("Retrieving {} sweepstake entries", count);
        return jdbcTemplate.query(
                SQL_SELECT_SWEEPSTAKES,
                new Object[]{count},
                rowMapper);
    }
}
