package com.ChatApp.Services;

import com.ChatApp.DTO.ChatMessageDto;
import com.ChatApp.Modal.ChatMessage;
import com.ChatApp.Repos.ChatMessageRepository;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ChatMessageService {

    private final SimpMessagingTemplate simpMessagingTemplate;

    private final ChatMessageRepository chatMessageRepository;


    public ChatMessageService(SimpMessagingTemplate simpMessagingTemplate, ChatMessageRepository chatMessageRepository) {
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.chatMessageRepository = chatMessageRepository;
    }


    public ChatMessage sendMessage(ChatMessageDto chatMessageDto){
        ChatMessage chatMessage = new ChatMessage();
        chatMessage.setContent(chatMessageDto.getContent());
        chatMessage.setTimestamp(LocalDateTime.now());
        chatMessageRepository.save(chatMessage);
        simpMessagingTemplate.convertAndSend("topic/messages/", chatMessage);
        return chatMessage;
    }

    public List<ChatMessage> getMessages(){
        return chatMessageRepository.findAll();
    }

    public ChatMessage getMessage(Long id){
        return chatMessageRepository.findById(id).orElseThrow(()-> new RuntimeException("Messages not found!"));
    }


}
