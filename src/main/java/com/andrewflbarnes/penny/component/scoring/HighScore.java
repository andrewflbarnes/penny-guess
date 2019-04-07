package com.andrewflbarnes.penny.component.scoring;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HighScore {
    private String name;
    private int score;
}
