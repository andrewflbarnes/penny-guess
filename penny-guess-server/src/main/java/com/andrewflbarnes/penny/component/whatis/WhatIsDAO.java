package com.andrewflbarnes.penny.component.whatis;

import java.util.List;

public interface WhatIsDAO {

    List<String> getWhatIs();

    boolean addWhatIs(String what);
}
