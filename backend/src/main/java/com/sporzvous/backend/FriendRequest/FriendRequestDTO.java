package com.sporzvous.backend.FriendRequest;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class FriendRequestDTO {
    private Long friendRequestId;
    private Long senderId;
    private String senderFullName;
    private FriendRequestStatus friendRequestStatus;
}