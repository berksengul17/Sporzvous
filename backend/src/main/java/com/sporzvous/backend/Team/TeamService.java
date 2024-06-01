package com.sporzvous.backend.Team;

import com.sporzvous.backend.Event.Event;
import com.sporzvous.backend.Event.EventRepository;
import com.sporzvous.backend.User.User;
import com.sporzvous.backend.User.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class TeamService {
    private final TeamRepository teamRepository;
    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    @Transactional
    public void addUserToTeam(Event event, User user) {
        List<Team> teamList = event.getTeams();

        boolean isUserInTeam = (event.getTeams().get(0).getUsers().contains(user)
                && event.getTeams().get(1).getUsers().contains(user));

        Team firstTeam = teamList.get(0);
        Team secondTeam = teamList.get(1);

            if (!isUserInTeam) {
                if (firstTeam.getUsers().size() != firstTeam.getTeamCapacity() && firstTeam.getUsers().size() <= secondTeam.getUsers().size()) {
                    firstTeam.getUsers().add(user);
                    user.getTeams().add(firstTeam);
                    teamRepository.save(firstTeam);
                } else {
                    secondTeam.getUsers().add(user);
                    user.getTeams().add(secondTeam);
                    teamRepository.save(secondTeam);
                }

                userRepository.save(user);
            }
    }

    public void changeTeam(Team currentTeam, Team otherTeam, User user) {
        // Remove user from the current team and add to the other team
        try {
            currentTeam.getUsers().remove(user);
            otherTeam.getUsers().add(user);
        }catch (Exception e )
        {
            throw new IllegalStateException("User could not found while changing teams");
        }
        teamRepository.save(currentTeam);
        teamRepository.save(otherTeam);
    }

    public void addScore(Long eventId, Integer firstTeamScore, Integer secondTeamScore) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(()-> new IllegalArgumentException("Event could not found during scoring"));

        event.getTeams().get(0).setScore(firstTeamScore);
        event.getTeams().get(1).setScore(secondTeamScore);

        eventRepository.save(event);
    }
}
