package com.andrewflbarnes.penny.web.cors;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

@Data
@Slf4j
public class CorsProperties {
    private List<String> exact;
    private List<CorsGenerator> generators;
}
