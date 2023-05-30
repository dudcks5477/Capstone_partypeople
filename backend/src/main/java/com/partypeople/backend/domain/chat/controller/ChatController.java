package com.partypeople.backend.domain.chat.controller;

import com.partypeople.backend.domain.account.User;
import com.partypeople.backend.domain.account.UserRepository;
import com.partypeople.backend.domain.chat.entity.ChatMessage;
import com.partypeople.backend.domain.chat.entity.ChatRoom;
import com.partypeople.backend.domain.chat.entity.Message;
import com.partypeople.backend.domain.chat.repository.ChatMessageRepository;
import com.partypeople.backend.domain.chat.repository.ChatRoomRepository;
import com.partypeople.backend.domain.chat.repository.DatabaseMessageRepository;
import com.partypeople.backend.domain.chat.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;
import java.util.List;

@Controller
public class ChatController {
    private final SimpMessageSendingOperations messagingTemplate;
    private final ChatMessageRepository chatMessageRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final MessageRepository messageRepository;
    private UserRepository userRepository;

    @Autowired
    public ChatController(SimpMessageSendingOperations messagingTemplate, ChatMessageRepository chatMessageRepository, ChatRoomRepository chatRoomRepository, MessageRepository messageRepository) {
        this.messagingTemplate = messagingTemplate;
        this.chatMessageRepository = chatMessageRepository;
        this.chatRoomRepository = chatRoomRepository;
        this.messageRepository = messageRepository;
    }

    @MessageMapping("/chat.sendMessage")
    public void sendMessage(@Payload ChatMessage chatMessage) {
        chatMessage.setSentAt(LocalDateTime.now()); // 메시지 전송 시간 설정
        chatMessageRepository.save(chatMessage);
        messagingTemplate.convertAndSend("/chat/party/" + chatMessage.getParty().getId(), chatMessage);
    }


    @MessageMapping("/chat.addUser")
    public void addUser(@Payload ChatMessage chatMessage) {
        ChatRoom chatRoom = chatRoomRepository.findById(chatMessage.getParty().getId()).orElse(null);
        if (chatRoom != null) {
            User user = chatMessage.getUser();  // ChatMessage 객체에서 사용자 정보 가져오기
            if (user != null) {
                chatRoom.getParticipants().add(user);  // 수정된 부분: User 변수 대신 user 객체 사용
                user.getChatRooms().add(chatRoom);  // 수정된 부분: 사용자의 ChatRoom 목록에도 chatRoom 추가
                chatRoomRepository.save(chatRoom);
                userRepository.save(user);  // 사용자 정보 저장
            }
        }
        messagingTemplate.convertAndSend("/chat/party/" + chatMessage.getParty().getId(), chatMessage);
    }


    public void sendMessage(String content, String sender) {
        Message message = new Message();
        message.setContent(content);
        message.setSender(sender);
        message.setTimestamp(LocalDateTime.now());

        messageRepository.save(message);
    }

    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }
}