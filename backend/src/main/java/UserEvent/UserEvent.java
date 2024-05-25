package UserEvent;

import com.sporzvous.backend.Event.Event;
import com.sporzvous.backend.User.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.Hibernate;

import java.io.Serializable;

@Entity
@NoArgsConstructor
@Getter
@Setter
@ToString

public class UserEvent implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long UserEventId;
    @ManyToOne
    @MapsId("user_id")
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne
    @MapsId("event_id")
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
