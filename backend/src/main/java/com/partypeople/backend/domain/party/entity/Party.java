package com.partypeople.backend.domain.party.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.partypeople.backend.domain.account.User;
import com.partypeople.backend.domain.chat.entity.ChatRoom;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import com.sun.istack.NotNull;
import org.apache.commons.io.FilenameUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;


import javax.persistence.*;
import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;

@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Entity
public class Party {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    private String partyName;
    private double longitude;
    private double latitude;
    private String partyLocation;
    private LocalDateTime partyDateTime;
    private Long numOfPeople;
    private String content;

    //@NotNull
    //private int coin;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

    @ManyToMany
    @JoinTable(
            name = "party_participants",
            joinColumns = @JoinColumn(name = "party_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> participants = new HashSet<>();

    @ManyToMany(mappedBy = "wishlist")
    private Set<User> users = new HashSet<>();

    @ManyToMany(mappedBy = "chatRooms")
    private Set<User> chatParticipants = new HashSet<>();

    @ManyToMany(mappedBy = "parties")
    private List<ChatRoom> chatRooms = new ArrayList<>();

    public void addParticipant(User user) {
        participants.add(user);
        user.getParties().add(this);
    }

    public boolean containsParticipant(User user) {

        return participants.contains(user);
    }


    @Transient
    private MultipartFile imageFile;

    private String imageName;

    public void uploadImageFile() throws IOException {
        if (imageFile != null && !imageFile.isEmpty()) {
            String fileName = StringUtils.cleanPath(imageFile.getOriginalFilename());
            String fileExtension = FilenameUtils.getExtension(fileName);
            String generatedFileName = UUID.randomUUID().toString() + "." + fileExtension;
            String uploadDir = "src/main/resources"; // 이미지 업로드 디렉토리 경로

            File uploadDirPath = new File(uploadDir);
            if (!uploadDirPath.exists()) {
                uploadDirPath.mkdirs();
            }

            File uploadedFile = new File(uploadDir + File.separator + generatedFileName);
            imageFile.transferTo(uploadedFile);

            this.imageName = generatedFileName;
        }


    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setPartyName(String partyName) {
        this.partyName = partyName;
    }

    public void setPartyLocation(String partyLocation) {
        this.partyLocation = partyLocation;
    }

    public void setPartyDateTime(LocalDateTime partyDateTime) {
        this.partyDateTime = partyDateTime;
    }

    public void setNumOfPeople(Long numOfPeople) {
        this.numOfPeople = numOfPeople;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setParticipants(Set<User> participants) {
        this.participants = participants;
    }

    public void setImageFile(MultipartFile imageFile) {
        this.imageFile = imageFile;
    }

    public void setImageName(String imageName) {
        this.imageName = imageName;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }
}