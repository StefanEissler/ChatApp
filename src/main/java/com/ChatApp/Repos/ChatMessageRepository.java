package com.ChatApp.Repos;

import com.ChatApp.Modal.ChatMessage;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ChatMessageRepository extends CrudRepository<ChatMessage, Long> {
    List<ChatMessage> findAll();
}
