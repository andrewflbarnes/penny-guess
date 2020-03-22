package com.andrewflbarnes.penny;

import com.andrewflbarnes.penny.component.aprun.AprunConfig;
import com.andrewflbarnes.penny.web.BuildProperties;
import com.andrewflbarnes.penny.web.WebConfig;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.DependsOn;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;


@Slf4j
@SpringBootApplication
@DependsOn("PropertyReporter")
public class Application extends SpringBootServletInitializer {

    /**
     * Used when run standalone
     */
    public static void main(String[] args) {
        configureApplication(new SpringApplicationBuilder()).run(args);
    }

    /**
     * Used when run as war
     */
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return configureApplication(builder);
    }

    private static SpringApplicationBuilder configureApplication(SpringApplicationBuilder builder) {
        return builder
                .sources(Application.class)
                .properties("spring.config.name:penny");
    }

    @Component("PropertyReporter")
    public static class PropertyReporter {

        private BuildProperties buildProperties;
        private AprunConfig.AprunProperties aprunProperties;
        private WebConfig.WebProperties webProperties;

        public PropertyReporter(BuildProperties buildProperties,
                                AprunConfig.AprunProperties aprunProperties,
                                WebConfig.WebProperties webProperties) {
            this.buildProperties = buildProperties;
            this.aprunProperties = aprunProperties;
            this.webProperties = webProperties;
            report();
        }

        private void report() {
            log.info("***** VERSION: {} *****", buildProperties.getVersion());
            log.info("APRUN properties: {}", aprunProperties);
            log.info("WEB properties: {}", webProperties);
        }
    }
}
