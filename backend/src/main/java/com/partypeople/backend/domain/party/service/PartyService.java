package com.partypeople.backend.domain.party.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.partypeople.backend.domain.account.User;
import com.partypeople.backend.domain.account.UserRepository;
import com.partypeople.backend.domain.global.Exception.AlreadyJoinedException;
import com.partypeople.backend.domain.global.Exception.PartyNotFoundException;
import com.partypeople.backend.domain.global.Exception.UserNotFoundException;
import com.partypeople.backend.domain.global.Exception.AccessDeniedException;
import com.partypeople.backend.domain.party.dto.PartyRequestDto;
import com.partypeople.backend.domain.party.dto.PartyResponseDto;
import com.partypeople.backend.domain.party.entity.ImageDetail;
import com.partypeople.backend.domain.party.entity.Party;
import com.partypeople.backend.domain.party.repository.PartyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Transactional
@Service
public class PartyService {
    private final PartyRepository partyRepository;
    private final UserRepository userRepository;


    private final AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;


    @Transactional
    public Long createParty(PartyRequestDto requestDto, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + userId));

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

        Party savedParty = partyRepository.save(party);

        int experienceToAdd = 100;
        user.addExperience(experienceToAdd);

        userRepository.save(user);
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

        party.setPartyName(requestDto.getPartyName());
        party.setLatitude(requestDto.getLatitude());
        party.setLongitude(requestDto.getLongitude());
        party.setPartyLocation(requestDto.getPartyLocation());
        party.setPartyDateTime(LocalDateTime.of(requestDto.getPartyDate(), requestDto.getPartyTime()));
        party.setNumOfPeople(requestDto.getNumOfPeople());
        party.setContent(requestDto.getContent());

        if (images != null && !images.isEmpty()) {
            try {
                List<ImageDetail> imageDetails = uploadImageFiles(images);
                party.setImageDetails(imageDetails);
            } catch (IOException e) {

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

        if (party.getParticipants().contains(user)) {
            throw new AlreadyJoinedException("User is already joined to this party");
        }

        party.addParticipant(user);


        user.addExperience(50);

        partyRepository.save(party);
    }

    public List<PartyResponseDto> getAllParties() {
        List<Party> parties = partyRepository.findAll();
        return parties.stream()
                .map(PartyResponseDto::new)
                .collect(Collectors.toList());
    }

    public List<ImageDetail> uploadImageFiles(List<MultipartFile> imageFiles) throws IOException {
        List<ImageDetail> imageDetails = new ArrayList<>();
        if (imageFiles != null && !imageFiles.isEmpty()) {
            for (int i = 0; i < imageFiles.size(); i++) {
                MultipartFile imageFile = imageFiles.get(i);
                if (imageFile != null && !imageFile.isEmpty()) {
                    String originalFileName = imageFile.getOriginalFilename();
                    String fileExtension = getFileExtension(originalFileName);
                    String generatedFileName = UUID.randomUUID().toString() + "." + fileExtension;

                    ObjectMetadata metadata = new ObjectMetadata();
                    metadata.setContentLength(imageFile.getSize());

                    PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, generatedFileName, imageFile.getInputStream(), metadata);
                    amazonS3.putObject(putObjectRequest);

                    String uri = amazonS3.getUrl(bucketName, generatedFileName).toString();
                    imageDetails.add(new ImageDetail(generatedFileName, uri));
                }
            }
        }
        return imageDetails;
    }

    private String getFileExtension(String filename) {
        if (filename != null && filename.contains(".")) {
            return filename.substring(filename.lastIndexOf(".") + 1);
        }
        return "";
    }


    @Transactional
    public List<ImageDetail> uploadPartyImages(Long partyId, List<MultipartFile> images) {
        Party party = partyRepository.findById(partyId)
                .orElseThrow(() -> new PartyNotFoundException("Party not found with ID: " + partyId));

        try {
            List<ImageDetail> imageDetails = uploadImageFiles(images);
            party.setImageDetails(imageDetails); // Party에 이미지 정보 설정
            partyRepository.save(party);
            return imageDetails;
        } catch (IOException e) {
            // 예외 처리
        }

        return Collections.emptyList();
    }

}