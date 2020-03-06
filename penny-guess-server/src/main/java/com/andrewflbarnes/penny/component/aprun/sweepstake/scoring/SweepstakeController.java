package com.andrewflbarnes.penny.component.aprun.sweepstake.scoring;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.Optional;

@RestController
@RequestMapping(
        produces = MediaType.APPLICATION_JSON_VALUE,
        path = "api/sweepstake"
)
@AllArgsConstructor
public class SweepstakeController {

    private static final String TIME_REGEX = "\\d*\\d:\\d\\d:\\d\\d";
    private static final Collection<String> ALLOWABLE_RUNNERS = Collections.unmodifiableCollection(
            Arrays.asList("Penny", "Andrew"));

    private SweepstakeService sweepstakeService;

    @CrossOrigin(origins = "https://www.andrewandpenny.run")
    @PostMapping(
            consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity addSweepstake(@RequestBody SweepstakeEntry sweepstakeEntry) {
        if (StringUtils.isEmpty(sweepstakeEntry.getRunner()) ||
                StringUtils.isEmpty(sweepstakeEntry.getName()) ||
                StringUtils.isEmpty(sweepstakeEntry.getTime())) {
            return asErrorResponse("NAME, RUNNER and TIME must be specified");
        }

        final SweepstakeEntry sanitised = SweepstakeEntry.builder()
                .name(sweepstakeEntry.getName().trim())
                .runner(sweepstakeEntry.getRunner().trim())
                .time(sweepstakeEntry.getTime().trim())
                .message(Optional.ofNullable(sweepstakeEntry.getMessage()).map(String::trim).orElse(""))
                .build();

        if (!sanitised.getTime().matches(TIME_REGEX)) {
            return asErrorResponse("TIME field must match HH:MM:SS format");
        }

        if (!ALLOWABLE_RUNNERS.contains(sanitised.getRunner())) {
            return asErrorResponse("Runner must be one of " + ALLOWABLE_RUNNERS);
        }

        if (!sweepstakeService.addSweepstake(sanitised)) {
            return asErrorResponse("Sweepstake already exists for " + sanitised.getName());
        }

        return ResponseEntity.ok(sanitised);
    }

    @CrossOrigin(origins = "https://www.andrewandpenny.run")
    @GetMapping
    public Object getSweepstakes(
            @RequestParam(name = "count", required = false, defaultValue = "1000") int count) {
        return sweepstakeService.getSweepstakes(count);
    }

    private ResponseEntity asErrorResponse(final String error) {
        return ResponseEntity.badRequest().body(Collections.singletonMap("error", error));

    }

}
