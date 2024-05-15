package com.sporzvous.backend.FriendRequest;

import com.sporzvous.backend.User.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.Hibernate;

import java.util.Objects;

@Entity

@NoArgsConstructor
@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class FriendRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long friendRequestId;
    @ManyToOne
    @JoinColumn(name = "sender_id", nullable = false)
    private User receiver;
    @ManyToOne
    @JoinColumn(name = "receiver_id", nullable = false)
    private User sender;
    private FriendRequestStatus friendRequestStatus;

    public FriendRequest(User sender, User receiver) {
        this.sender = sender;
        this.receiver = receiver;
        this.friendRequestStatus = FriendRequestStatus.PENDING;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        FriendRequest that = (FriendRequest) o;
        return friendRequestId != null && Objects.equals(friendRequestId, that.friendRequestId);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
