package com.andrewflbarnes.penny.component.whatis;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class WhatIsService {

    private WhatIsDAO whatIsDAO;

    public List<String> getWhatIs() {
        return whatIsDAO.getWhatIs();
    }

    public boolean addWhatIs(String what) {
        return whatIsDAO.addWhatIs(what);
    }
}
