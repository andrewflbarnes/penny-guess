package com.andrewflbarnes.penny.web;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import java.util.List;

@Configuration
public class WebConfig {

    @Data
    @ConfigurationProperties(prefix = "penny.web")
    @Component
    public static class WebProperties {
        private List<String> allowedOrigins;
    }

    @Bean("allowedOrigins")
    public List<String> allowedOrigins(final WebProperties props) {
        return props.getAllowedOrigins();
    }
}
