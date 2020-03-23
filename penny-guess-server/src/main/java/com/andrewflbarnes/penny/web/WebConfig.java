package com.andrewflbarnes.penny.web;

import com.andrewflbarnes.penny.web.cors.CorsGenerator;
import com.andrewflbarnes.penny.web.cors.CorsProperties;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Configuration
public class WebConfig {

    @Data
    @ConfigurationProperties(prefix = "corona")
    @Component
    public static class WebProperties {
        private CorsProperties cors;
    }

    @Bean("allowedOrigins")
    public List<String> allowedOrigins(final WebProperties props) {
        final List<String> allowedOrigins = new ArrayList<>(props.getCors().getExact());
        props.getCors().getGenerators().stream()
                .map(CorsGenerator::getAllowedOrigins)
                .forEach(allowedOrigins::addAll);

        return allowedOrigins;
    }
}
