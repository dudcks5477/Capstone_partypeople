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
import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Transactional
@Service
public class PartyService {
    private final PartyRepository partyRepository;
    private final UserRepository userRepository;
    private final String uploadDir = "src/main/resources";
    @Transactional
    public Long createParty(PartyRequestDto requestDto, Long userId, List<MultipartFile> images) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + userId));

        // 파티 생성 로직
        LocalDateTime partyDateTime = LocalDateTime.of(requestDto.getPartyDate(), requestDto.getPartyTime());

        Party party = Party.builder()
                .partyName(requestDto.getPartyName())
                .longitude(requestDto.getLongitude())
                .latitude(requestDto.getLatitude())
                .partyLocation(requestDto.getPartyLocation())
                .partyDateTime(partyDateTime)
                .numOfPeople(requestDto.getNumOfPeople())
                .content(requestDto.getContent())
                .participants(Collections.singleton(user))
                .build();

        try {
            List<String> imageNames = uploadImageFiles(images); // 이미지 업로드 메소드 호출
            party.setImageNames(imageNames);
        } catch (IOException e) {
            // 이미지 업로드 실패 시 예외 처리
            // 적절한 예외 처리 로직 추가
        }

        Party savedParty = partyRepository.save(party);

        // 경험치 증가
        int experienceToAdd = 100; // 경험치 증가량 설정
        user.addExperience(experienceToAdd);

        userRepository.save(user); // 업데이트된 사용자 저장
        return savedParty.getId();
    }

    public PartyResponseDto getParty(Long partyId) {
        Party party = partyRepository.findById(partyId)
                .orElseThrow(() -> new PartyNotFoundException("Party not found"));

        return new PartyResponseDto(party);
    }
    @Transactional
    public void updateParty(Long partyId, PartyRequestDto requestDto, Long userId, List<MultipartFile> images) {
        Party party = partyRepository.findById(partyId)
                .orElseThrow(() -> new PartyNotFoundException("Party not found"));

        if (!party.getParticipants().stream().anyMatch(user -> user.getId().equals(userId))) {
            throw new AccessDeniedException("You do not have permission to delete this party");
        }

        // 파티 정보 업데이트
        party.setPartyName(requestDto.getPartyName());
        party.setLatitude(requestDto.getLatitude());
        party.setLongitude(requestDto.getLongitude());
        party.setPartyLocation(requestDto.getPartyLocation());
        party.setPartyDateTime(LocalDateTime.of(requestDto.getPartyDate(), requestDto.getPartyTime()));
        party.setNumOfPeople(requestDto.getNumOfPeople());
        party.setContent(requestDto.getContent());

        // 이미지 업로드
        if (images != null && !images.isEmpty()) {
            try {
                List<String> imageNames = uploadImageFiles(images); // 이미지 업로드 메소드 호출
                party.setImageNames(imageNames);
            } catch (IOException e) {
                // 이미지 업로드 실패 시 예외 처리
                // 적절한 예외 처리 로직 추가
            }
        }
        partyRepository.save(party);
    }
    public void deleteParty(Long partyId, Long userId) {
        Party party = partyRepository.findById(partyId)
                .orElseThrow(() -> new PartyNotFoundException("Party not found"));

        if (!party.getParticipants().stream().anyMatch(user -> user.getId().equals(userId))) {
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

        // 사용자의 경험치를 증가시킵니다.
        user.addExperience(50); // 예시: 50의 경험치를 증가시킵니다.

        partyRepository.save(party);
    }

    public List<PartyResponseDto> getAllParties() {
        List<Party> parties = partyRepository.findAll();
        return parties.stream()
                .map(PartyResponseDto::new)
                .collect(Collectors.toList());
    }

    public List<String> uploadImageFiles(List<MultipartFile> imageFiles) throws IOException {
        List<String> imageNames = new ArrayList<>();
        if (imageFiles != null && !imageFiles.isEmpty()) {
            String uploadDir = System.getProperty("user.dir") + "/src/main/resources/"; // 이미지 업로드 디렉토리 경로

            File uploadDirPath = new File(uploadDir);
            if (!uploadDirPath.exists()) {
                uploadDirPath.mkdirs();
            }

            for (int i = 0; i < imageFiles.size(); i++) {
                MultipartFile imageFile = imageFiles.get(i);
                if (imageFile != null && !imageFile.isEmpty()) {
                    String originalFileName = StringUtils.cleanPath(imageFile.getOriginalFilename());
                    String fileExtension = FilenameUtils.getExtension(originalFileName);
                    String generatedFileName = "image_" + (i + 1) + "." + fileExtension;

                    File uploadedFile = new File(uploadDir + File.separator + generatedFileName);
                    imageFile.transferTo(uploadedFile);

                    imageNames.add(generatedFileName);
                }
            }
        }
        return imageNames;
    }
}