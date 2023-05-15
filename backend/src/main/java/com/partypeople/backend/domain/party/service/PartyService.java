package com.partypeople.backend.domain.party.service;

import com.partypeople.backend.domain.account.User;
import com.partypeople.backend.domain.account.UserRepository;
import com.partypeople.backend.domain.global.Exception.AlreadyJoinedException;
import com.partypeople.backend.domain.global.Exception.PartyNotFoundException;
import com.partypeople.backend.domain.global.Exception.UserNotFoundException;
import com.partypeople.backend.domain.global.Exception.AccessDeniedException;
import com.partypeople.backend.domain.party.dto.PartyRequestDto;
import com.partypeople.backend.domain.party.dto.PartyResponseDto;
import com.partypeople.backend.domain.party.entity.Party;
import com.partypeople.backend.domain.party.repository.PartyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Transactional
@Service
public class PartyService {
    private final PartyRepository partyRepository;
    private final UserRepository userRepository;
    public Long createParty(PartyRequestDto requestDto, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + userId));

        // 파티 생성 로직
        LocalDateTime partyDateTime = LocalDateTime.of(requestDto.getPartyDate(), requestDto.getPartyTime());

        Party party = Party.builder()
                .partyName(requestDto.getPartyName())
                .partyLocation(requestDto.getPartyLocation())
                .partyDateTime(partyDateTime)
                .numOfPeople(requestDto.getNumOfPeople())
                .content(requestDto.getContent())
                .participants(Collections.singleton(user))
                .imageFile(requestDto.getImageFile())
                .build();
        try {
            party.uploadImageFile(); // 이미지 업로드 메소드 호출
        } catch (IOException e) {
            // 이미지 업로드 실패 시 예외 처리
            // 적절한 예외 처리 로직 추가
        }


        Party savedParty = partyRepository.save(party);
        return savedParty.getId();
    }

    public PartyResponseDto getParty(Long partyId) {
        Party party = partyRepository.findById(partyId)
                .orElseThrow(() -> new PartyNotFoundException("Party not found"));

        return new PartyResponseDto(party);
    }
    public void updateParty(Long partyId, PartyRequestDto requestDto, Long userId) {
        Party party = partyRepository.findById(partyId)
                .orElseThrow(() -> new PartyNotFoundException("Party not found"));

        if (!party.getParticipants().contains(userId)) {
            throw new AccessDeniedException("You do not have permission to update this party");
        }

        // 파티 정보 업데이트
        party.setPartyName(requestDto.getPartyName());
        party.setPartyLocation(requestDto.getPartyLocation());
        party.setPartyDateTime(LocalDateTime.of(requestDto.getPartyDate(), requestDto.getPartyTime()));
        party.setNumOfPeople(requestDto.getNumOfPeople());
        party.setContent(requestDto.getContent());

        // 이미지 업로드
        MultipartFile imageFile = requestDto.getImageFile();
        if (imageFile != null && !imageFile.isEmpty()) {
            try {
                party.setImageFile(imageFile);
                party.uploadImageFile();
            } catch (IOException e) {
                //throw new FileUploadException("Failed to upload image file.");
            }
        }


        partyRepository.save(party);
    }

    public void deleteParty(Long partyId, Long userId) {
        Party party = partyRepository.findById(partyId)
                .orElseThrow(() -> new PartyNotFoundException("Party not found"));

        if (!party.getParticipants().contains(userId)) {
            throw new AccessDeniedException("You do not have permission to delete this party");
        }

        partyRepository.delete(party);
    }

    public void joinParty(Long partyId, Long userId) {
        Party party = partyRepository.findById(partyId)
                .orElseThrow(() -> new PartyNotFoundException("Party not found with ID: " + partyId));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + userId));

        // 이미 참가한 사용자인지 확인
        if (party.getParticipants().contains(user)) {
            throw new AlreadyJoinedException("User is already joined to this party");
        }

        party.addParticipant(user);
        partyRepository.save(party);
    }

    public List<PartyResponseDto> getAllParties() {
        List<Party> parties = partyRepository.findAll();
        return parties.stream()
                .map(PartyResponseDto::new)
                .collect(Collectors.toList());
    }

}