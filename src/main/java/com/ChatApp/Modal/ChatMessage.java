package com.ChatApp.Modal;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "chatmessages")
@Getter
@Setter
@NoArgsConstructor
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String content;
    private LocalDateTime timestamp;

    public ChatMessage(Long id, String content, LocalDateTime timestamp) {
        this.id = id;
        this.content = content;
        this.timestamp = timestamp;
    }

}
