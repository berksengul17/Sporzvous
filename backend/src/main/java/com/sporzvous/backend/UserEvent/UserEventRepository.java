package com.sporzvous.backend.UserEvent;

import com.sporzvous.backend.Event.Event;
import com.sporzvous.backend.User.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserEventRepository extends JpaRepository<UserEvent, Long> {

    UserEvent findByUserAndEvent(User user, Event event);
}
