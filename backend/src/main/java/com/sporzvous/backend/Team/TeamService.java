package com.sporzvous.backend.Team;

import com.sporzvous.backend.Event.Event;
import com.sporzvous.backend.User.User;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class TeamService {
    private final TeamRepository teamRepository;
    
    public void addUserToTeam(Event event, User user) {
        List<Team> teamList = event.getTeams();
        Team firstTeam = teamList.get(0);
        Team secondTeam = teamList.get(1);
        //TODO Kullanıcılar az olan takıma eklensin
        if (firstTeam.getUsers().size() != firstTeam.getTeamCapacity()) {
            firstTeam.getUsers().add(user);
            teamRepository.save(firstTeam);
        } else {
            secondTeam.getUsers().add(user);
            teamRepository.save(secondTeam);
        }
    }

    public void changeTeam(Team currentTeam, Team otherTeam, User user) {
        // Remove user from the current team and add to the other team
        currentTeam.getUsers().remove(user);
        otherTeam.getUsers().add(user);

        // Save the changes
        teamRepository.save(currentTeam);
        teamRepository.save(otherTeam);
    }
}
