package com.partypeople.backend.domain.party.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.partypeople.backend.domain.account.User;
import com.partypeople.backend.domain.party.entity.Party;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.stream.Collectors;

public class PartyResponseDto {
    @JsonProperty("id")
    private Long id;

    @JsonProperty("partyName")
    private String partyName;

    @JsonProperty("longitude")
    private double longitude;

    @JsonProperty("latitude")
    private double latitude;

    @JsonProperty("partyLocation")
    private String partyLocation;

    @JsonProperty("partyDateTime")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime partyDateTime;

    @JsonProperty("numOfPeople")
    private Long numOfPeople;

    @JsonProperty("content")
    private String content;

    @JsonProperty("userId")
    private Long userId;

    @JsonProperty("imageName")
    private String imageName;

    @JsonProperty("participantIds")
    private Set<Long> participantIds;

    public PartyResponseDto(Party party) {
        this.id = party.getId();
        this.partyName = party.getPartyName();
        this.longitude =  party.getLongitude();
        this.latitude = party.getLatitude();
        this.partyLocation = party.getPartyLocation();
        this.partyDateTime = party.getPartyDateTime();
        this.numOfPeople = party.getNumOfPeople();
        this.content = party.getContent();
        this.imageName = party.getImageName();
        this.userId = party.getUserId();
        // 추가된 코드
        this.participantIds = party.getParticipants().stream()
                .map(User::getId)
                .collect(Collectors.toSet());
    }
}
