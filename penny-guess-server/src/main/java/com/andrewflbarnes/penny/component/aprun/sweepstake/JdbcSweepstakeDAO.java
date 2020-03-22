package com.andrewflbarnes.penny.component.aprun.sweepstake;

import com.andrewflbarnes.penny.util.Utils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Slf4j
public class JdbcSweepstakeDAO implements SweepstakeDAO {

    private final RowMapper<SweepstakeEntry> rowMapper = new SweepstakeRowMapper();

    private final JdbcTemplate jdbcTemplate;
    private final String sqlInsertSweepstake;
    private final String sqlSelectUserSweepstake;
    private final String sqlSelectSweepstakes;

    public JdbcSweepstakeDAO(final JdbcTemplate jdbcTemplate, @Qualifier("dbType") final String dbType) {
        this.jdbcTemplate = jdbcTemplate;
        sqlInsertSweepstake =
                Utils.loadSqlResourceContents(dbType, "sweepstake_insert.sql");
        sqlSelectUserSweepstake =
                Utils.loadSqlResourceContents(dbType, "sweepstake_select_by_user.sql");
        sqlSelectSweepstakes =
                Utils.loadSqlResourceContents(dbType, "sweepstake_select_all.sql");
    }

    public boolean addSweepstake(final SweepstakeEntry sweepstakeEntry) {
        log.debug("Persisting sweepstake entry {}", sweepstakeEntry);
        return jdbcTemplate.update(
                sqlInsertSweepstake,
                sweepstakeEntry.getName(),
                sweepstakeEntry.getRunner(),
                sweepstakeEntry.getTime(),
                sweepstakeEntry.getMessage(),
                sweepstakeEntry.getContact()) > 0;
    }

    public SweepstakeEntry getSweepstake(final String name) {
        try {
            log.debug("Retrieving sweepstake entry for {}", name);
            return jdbcTemplate.queryForObject(
                    sqlSelectUserSweepstake,
                    new Object[]{name},
                    rowMapper);
        } catch (EmptyResultDataAccessException e) {
            log.debug("No sweepstake entry found for {}", name);
            return null;
        }
    }

    public List<SweepstakeEntry> getSweepstakes(final int count) {
        log.debug("Retrieving {} sweepstake entries", count);
        return jdbcTemplate.query(
                sqlSelectSweepstakes,
                new Object[]{count},
                rowMapper);
    }
}
