package com.sporzvous.backend.FriendList;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor

public class UserFriendId implements Serializable {
    private Long userId;
    private Long friendId;

    // Constructors, getters, setters, and equals/hashCode methods
}
