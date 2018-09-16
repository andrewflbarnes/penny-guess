package com.andrewflbarnes.penny;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.util.Map;
import java.util.Random;

@Controller
@SpringBootApplication
public class Main {

    private static final String PENNY_IS = "Penny is ";

    private final Random generator = new Random();

    public static void main(String[] args) throws Exception {
        SpringApplication.run(Main.class, args);
    }

    @RequestMapping("/")
    public String index(Map<String, Object> model) {
        String whatIsEnv = System.getenv().get("PENNY");

        if (whatIsEnv == null) {
            whatIsEnv = "the squidge";
        }

        String[] whatIsArray = whatIsEnv.split(",");

        String whatIs = whatIsArray[generator.nextInt(whatIsArray.length)];

        model.put("message", PENNY_IS + whatIs);
        return "index";
    }

}
