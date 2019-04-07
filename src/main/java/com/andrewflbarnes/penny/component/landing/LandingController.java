package com.andrewflbarnes.penny.component.landing;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;
import java.util.Random;

@Controller
public class LandingController {

    private static final String PENNY_IS = "Penny is ";

    private final Random generator = new Random();

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
