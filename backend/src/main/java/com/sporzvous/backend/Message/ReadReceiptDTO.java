package com.sporzvous.backend.Message;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReadReceiptDTO {
    private Long messageId;
    private Long senderId;
}