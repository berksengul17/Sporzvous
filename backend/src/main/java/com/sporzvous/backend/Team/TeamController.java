package com.sporzvous.backend.Team;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/api/team")
public class TeamController {
    private final TeamService teamService;
}
