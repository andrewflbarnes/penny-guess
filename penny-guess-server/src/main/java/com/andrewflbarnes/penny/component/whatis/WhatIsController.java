package com.andrewflbarnes.penny.component.whatis;

import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(
        produces = MediaType.APPLICATION_JSON_VALUE,
        path = "api/whatis"
)
@AllArgsConstructor
public class WhatIsController {

    private WhatIsService whatIsService;

    @GetMapping
    public List<String> getWhatIs() {
        return whatIsService.getWhatIs();
    }

    @PostMapping(
            consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public Map<String, String> addWhatIs(@RequestBody Map<String, String> body) {
        final String what = body.get("what");
        String response = "OK";

        if (!whatIsService.addWhatIs(what)) {
            response = String.format("Unable to add what: %s", what);
        }

        return Collections.singletonMap("response", response);
    }
}
