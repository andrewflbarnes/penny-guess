package com.andrewflbarnes.penny.component.aprun.sweepstake;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class SweepstakeEntry {
    private String name;
    private String runner;
    private String time;
    private String message;
    private String contact;
}
