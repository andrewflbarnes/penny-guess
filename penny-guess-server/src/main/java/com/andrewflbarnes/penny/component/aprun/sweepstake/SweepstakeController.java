package com.andrewflbarnes.penny.component.aprun.sweepstake;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

import static java.util.Optional.ofNullable;

@RestController
@RequestMapping(
        produces = MediaType.APPLICATION_JSON_VALUE,
        path = "api/sweepstake"
)
@Slf4j
public class SweepstakeController {

    private static final String TIME_REGEX = "\\d*\\d:[0-5]\\d:[0-5]\\d";

    private SweepstakeService sweepstakeService;
    private List<String> runners;

    public SweepstakeController(SweepstakeService sweepstakeService, @Qualifier("runners") List<String> runners) {
        this.sweepstakeService = sweepstakeService;
        this.runners = runners;
    }

    @PostMapping(
            consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity addSweepstake(@RequestBody SweepstakeEntry sweepstakeEntry) {
        final String name = sweepstakeEntry.getName();
        final String time = sweepstakeEntry.getTime();
        final String runner = sweepstakeEntry.getRunner();

        if (StringUtils.isEmpty(runner) ||
                StringUtils.isEmpty(name) ||
                StringUtils.isEmpty(time)) {
            log.debug("name ({}), time ({}) and runner ({}) must not be null", name, time, runner);
            return asErrorResponse("NAME, RUNNER and TIME must be specified");
        }

        final SweepstakeEntry sanitised = SweepstakeEntry.builder()
                .name(name.trim())
                .runner(runner.trim())
                .time(time.trim())
                .message(ofNullable(sweepstakeEntry.getMessage()).orElse("").trim())
                .contact(ofNullable(sweepstakeEntry.getContact()).orElse("").trim())
                .build();
        log.debug("Sanitised sweepstake entry from {} to {}", sweepstakeEntry, sanitised);

        if (!time.matches(TIME_REGEX)) {
            log.debug("Time ({}) does not match format \"{}\"", time, TIME_REGEX);
            return asErrorResponse("TIME field must match HH:MM:SS format");
        }

        if (!runners.contains(runner)) {
            log.debug("Runner ({}) must be one of {}", runner, runners);
            return asErrorResponse("Runner must be one of " + runners);
        }

        if (!sweepstakeService.addSweepstake(sanitised)) {
            log.debug("Sweepstake entry already exists for {}", name);
            return asErrorResponse("Sweepstake already exists for " + name);
        }

        return ResponseEntity.ok(sanitised);
    }

    @GetMapping
    public Object getSweepstakes(
            @RequestParam(name = "count", required = false, defaultValue = "1000") int count) {
        return sweepstakeService.getSweepstakes(count);
    }

    private ResponseEntity asErrorResponse(final String error) {
        return ResponseEntity.badRequest().body(Collections.singletonMap("error", error));

    }

}
