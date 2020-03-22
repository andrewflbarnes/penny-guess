package com.andrewflbarnes.penny.web;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
@EnableWebMvc
@Slf4j
public class CorsConfigurer implements WebMvcConfigurer {

    private List<String> allowedOrigins;

    public CorsConfigurer(@Qualifier("allowedOrigins") List<String> allowedOrigins) {
        this.allowedOrigins = allowedOrigins;
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        log.info("CORS accepting for {}", allowedOrigins);
        final CorsRegistration cors = registry.addMapping("/**");
        cors.allowedOrigins(allowedOrigins.toArray(new String[0]));
    }
}
