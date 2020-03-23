package com.andrewflbarnes.penny.web.cors;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;

@Data
@Slf4j
public class CorsGenerator {
    private List<String> protocols;
    private List<String> domains;
    private List<String> subdomains = new ArrayList<>();
    private boolean rootdomain = false;

    public List<String> getAllowedOrigins() {
        final List<String> origins = new ArrayList<>();

        for (final String protocol : protocols) {
            for (final String domain : domains) {
                for (final String subdomain : subdomains) {
                    final String origin = String.format("%s://%s.%s", protocol, subdomain, domain);
                    logOrigin(origin);
                    origins.add(origin);
                }

                if (rootdomain) {
                    final String origin = String.format("%s://%s", protocol, domain);
                    logOrigin(origin);
                    origins.add(origin);
                }
            }

        }

        final int size = origins.size();
        if (size < 1) {
            log.warn("Invalid CORS configuration resulting in {} allowedOrigins, defaulting to \"*\": ({})", size, this);
            origins.add("*");
        }

        return origins;
    }

    private void logOrigin(final String origin) {
        log.debug("Generated CORS allowed origin: {}", origin);
    }
}
