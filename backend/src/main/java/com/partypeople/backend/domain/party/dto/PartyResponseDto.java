package com.partypeople.backend.domain.party.dto;

import com.partypeople.backend.domain.account.User;
import com.partypeople.backend.domain.party.entity.Party;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.stream.Collectors;

public class PartyResponseDto {
    private Long id;
    private String partyName;
    private double longitude;
    private double latitude;
    private String partyLocation;
    private LocalDateTime partyDateTime;
    private Long numOfPeople;
    private String content;
    private Long userId;

    private String imageName;
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
        // 추가된 코드
        this.participantIds = party.getParticipants().stream()
                .map(User::getId)
                .collect(Collectors.toSet());
    }
}
