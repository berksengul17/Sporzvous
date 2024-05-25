package UserEvent;


import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;

@Embeddable
public class UserEventPK implements Serializable {
    @Column(name = "user_id")
    private Long user_id;

    @Column(name = "event_id")
    private Long event_id;

}
