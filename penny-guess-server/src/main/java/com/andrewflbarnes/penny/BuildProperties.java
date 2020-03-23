package com.andrewflbarnes.penny;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

@Data
@PropertySource("classpath:build.yml")
@Component
public class BuildProperties {
    @Value("${version}")
    private String version;
    @Value("${commit}")
    private String commit;
}
