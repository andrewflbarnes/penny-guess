package com.andrewflbarnes.penny.component.whatis;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class WhatIsRowMapper implements RowMapper<String> {

    public String mapRow(ResultSet resultSet, int i) throws SQLException {
        return resultSet.getString("what");
    }
}
