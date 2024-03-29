package com.partypeople.backend.domain.party.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PartyRequestDto {
    private String partyName;
    private double longitude;
    private double latitude;
    private String partyLocation;
    private LocalDate partyDate;
    private LocalTime partyTime;
    private Long numOfPeople;
    private String content;
}
