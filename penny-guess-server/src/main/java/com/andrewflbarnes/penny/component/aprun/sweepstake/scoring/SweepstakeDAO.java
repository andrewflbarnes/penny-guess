package com.andrewflbarnes.penny.component.aprun.sweepstake.scoring;

import java.util.List;

public interface SweepstakeDAO {

    boolean addSweepstake(SweepstakeEntry sweepstakeEntry);

    SweepstakeEntry getSweepstake(String name);

    List<SweepstakeEntry> getSweepstakes(int count);
}
