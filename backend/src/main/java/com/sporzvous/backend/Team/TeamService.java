package com.sporzvous.backend.Team;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class TeamService {
    private final TeamRepository teamRepository;
}
