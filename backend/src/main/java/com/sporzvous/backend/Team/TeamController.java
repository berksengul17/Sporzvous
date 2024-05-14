package com.sporzvous.backend.Team;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
public class TeamController {
    private final TeamService teamService;
}
