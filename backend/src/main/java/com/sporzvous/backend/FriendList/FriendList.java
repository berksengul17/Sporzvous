package com.sporzvous.backend.FriendList;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "user_friend")
@IdClass(UserFriendId.class)

public class FriendList {
    @Id
    private Long userId;
    @Id
    private Long friendId;
}
