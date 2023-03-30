package com.ChatApp.DTO;

import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class ChatMessageDto {

    private String content;

    public ChatMessageDto(){
        this.content = content;
    }

}
