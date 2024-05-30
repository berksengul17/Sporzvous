package com.sporzvous.backend.Message;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class MessageDto {
    private Long receiverId;
    private Long senderId;
    private String content;
    private LocalDateTime timeStamp;
}
