package com.partypeople.backend.domain.party.entity;

import com.fasterxml.jackson.annotation.*;
import com.partypeople.backend.domain.account.User;
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
    @JsonIgnoreProperties("hibernateLazyInitializer")
    private Set<User> users = new HashSet<>();

    public void addParticipant(User user) {
        participants.add(user);
        user.getParties().add(this);
    }

    public boolean containsParticipant(User user) {
        return participants.contains(user);
    }


    @JsonIgnore
    @Transient
    private List<MultipartFile> imageFiles;

    @ElementCollection
    @CollectionTable(name = "party_image", joinColumns = @JoinColumn(name = "party_id", referencedColumnName = "id"))
    @AttributeOverride(name = "name", column = @Column(name = "image_name"))
    private List<ImageDetail> imageDetails;


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

    public void setImageFiles(List<MultipartFile> imageFiles) {
        this.imageFiles = imageFiles;
    }

    public void setImageDetails(List<ImageDetail> imageDetails) {
        this.imageDetails = imageDetails;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

}