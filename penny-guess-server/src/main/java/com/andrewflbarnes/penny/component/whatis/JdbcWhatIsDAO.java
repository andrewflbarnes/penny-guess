package com.andrewflbarnes.penny.component.whatis;

import lombok.AllArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@AllArgsConstructor
public class JdbcWhatIsDAO implements  WhatIsDAO {

    private static final String SQL_INSERT_WHAT_IS = "INSERT INTO t_what_is(what) VALUES(?)";
    private static final String SQL_SELECT_WHAT_IS = "SELECT * FROM t_what_is";

    private final RowMapper<String> rowMapper = new WhatIsRowMapper();

    private JdbcTemplate jdbcTemplate;

    @Override
    public List<String> getWhatIs() {
        return jdbcTemplate.query(
                SQL_SELECT_WHAT_IS,
                rowMapper
        );
    }

    @Override
    public boolean addWhatIs(String what) {
        return jdbcTemplate.update(
                SQL_INSERT_WHAT_IS,
                what) > 0;
    }
}
