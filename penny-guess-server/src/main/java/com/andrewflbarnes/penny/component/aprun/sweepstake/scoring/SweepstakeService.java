package com.andrewflbarnes.penny.component.aprun.sweepstake.scoring;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class SweepstakeService {

    private SweepstakeDAO sweepstakeDAO;

    @Transactional(isolation = Isolation.SERIALIZABLE)
    public boolean addSweepstake(SweepstakeEntry sweepstakeEntry) {
        final SweepstakeEntry currentSweepstakeEntry = sweepstakeDAO.getSweepstake(sweepstakeEntry.getName());

        if (currentSweepstakeEntry == null) {
            return sweepstakeDAO.addSweepstake(sweepstakeEntry);
        }

        return false;
    }

    public List<SweepstakeEntry> getSweepstakes(int count) {
        return sweepstakeDAO.getSweepstakes(count);
    }
}
