package com.andrewflbarnes.penny.util;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

@Slf4j
public class Utils {

    private Utils() {}

    public static String loadResourceContents(final String resource) {
        try (InputStream is = Utils.class.getClassLoader().getResourceAsStream(resource)) {
            return IOUtils.toString(is, StandardCharsets.UTF_8);
        } catch (IOException e) {
            throw new IllegalArgumentException("Unable to lead resource from " + resource, e);
        }
    }
}
