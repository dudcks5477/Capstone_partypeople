package com.partypeople.backend.domain.chat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {
    private final SimpMessageSendingOperations messagingTemplate;
    private final ChatMessageRepository chatMessageRepository;
    private final ChatRoomRepository chatRoomRepository;

    @Autowired
    public ChatController(SimpMessageSendingOperations messagingTemplate, ChatMessageRepository chatMessageRepository, ChatRoomRepository chatRoomRepository) {
        this.messagingTemplate = messagingTemplate;
        this.chatMessageRepository = chatMessageRepository;
        this.chatRoomRepository = chatRoomRepository;
    }

    @MessageMapping("/chat.sendMessage")
    public void sendMessage(@Payload ChatMessage chatMessage) {
        chatMessageRepository.save(chatMessage);
        messagingTemplate.convertAndSend("/topic/party/" + chatMessage.getParty().getId(), chatMessage);
    }

    @MessageMapping("/chat.addUser")
    public void addUser(@Payload ChatMessage chatMessage) {
        ChatRoom chatRoom = chatRoomRepository.findById(chatMessage.getParty().getId()).orElse(null);
        if (chatRoom != null) {
            chatRoom.getParticipants().add(chatMessage.getSender());
            chatRoomRepository.save(chatRoom);
        }
        messagingTemplate.convertAndSend("/topic/party/" + chatMessage.getParty().getId(), chatMessage);
    }
}
