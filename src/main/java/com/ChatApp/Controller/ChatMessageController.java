package com.ChatApp.Controller;


import com.ChatApp.DTO.ChatMessageDto;
import com.ChatApp.Modal.ChatMessage;
import com.ChatApp.Services.ChatMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;


@Controller
@CrossOrigin
public class ChatMessageController {

    @Autowired
    ChatMessageService chatMessageService;

    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public ChatMessage sendMessage(@RequestBody ChatMessageDto chatMessageDto){
        return chatMessageService.sendMessage(chatMessageDto);
    }

}
