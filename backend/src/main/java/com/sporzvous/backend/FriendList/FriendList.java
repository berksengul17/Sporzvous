package com.sporzvous.backend.FriendList;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FriendList {
    @Id
    private Long userId;
    @Id
    private Long friendId;
}
