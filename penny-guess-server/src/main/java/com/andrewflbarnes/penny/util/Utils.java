package com.andrewflbarnes.penny.util;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

@Slf4j
public class Utils {

    private Utils() {}

    /**
     * Convenience method which will automatically look for a specified file in {@code sql/<dbType>}.
     *
     * @param dbType The type of db to retrieve SQL for
     * @param resource the name of the file holding the SQL
     * @return the SQL command from the file
     */
    public static String loadSqlResourceContents(final String dbType, final String resource) {
        return loadResourceContents(String.format("sql/%s/%s", dbType, resource));
    }

    public static String loadResourceContents(final String resource) {
        log.debug("Loading resource: {}", resource);
        try (InputStream is = Utils.class.getClassLoader().getResourceAsStream(resource)) {
            final String content = IOUtils.toString(is, StandardCharsets.UTF_8);

            log.info("Loaded resource: {}", resource);

            return content;
        } catch (IOException e) {
            throw new IllegalArgumentException("Unable to lead resource from " + resource, e);
        }
    }
}
