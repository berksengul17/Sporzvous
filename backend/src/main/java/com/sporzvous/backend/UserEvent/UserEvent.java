package com.sporzvous.backend.UserEvent;

import com.sporzvous.backend.Event.Event;
import com.sporzvous.backend.User.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.Hibernate;

@Entity

@NoArgsConstructor
@Getter
@Setter
@ToString
@Table(name="user_event")
public class UserEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userEventId;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;

    private UserEventStatus userEventStatus;

    public UserEvent(User user, Event event) {
        this.user = user;
        this.event = event;
        this.userEventStatus = UserEventStatus.SHOW;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        UserEvent userEvent = (UserEvent) o;
        return false;
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
