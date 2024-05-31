package com.sporzvous.backend.Message;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

//oısdjfıodsjıfo
@Getter
@Setter
@AllArgsConstructor
public class MessageDTO {
    private Long id;
    private Long senderId;
    private Long receiverId;
    private String content;
    private boolean readStatus;
    private LocalDateTime timestamp;
}

