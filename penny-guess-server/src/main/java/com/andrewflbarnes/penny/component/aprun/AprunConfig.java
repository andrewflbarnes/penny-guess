package com.andrewflbarnes.penny.component.aprun;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import java.util.List;

@Configuration
public class AprunConfig {

    @Data
    @ConfigurationProperties(prefix = "aprun")
    @Component
    public static class AprunProperties {
        private List<String> runners;
        private String database;
    }

    @Bean("dbType")
    public String dbType(final AprunProperties props) {
        return props.getDatabase();
    }

    @Bean("runners")
    public List<String> runners(final AprunProperties props) {
        return props.getRunners();
    }
}
