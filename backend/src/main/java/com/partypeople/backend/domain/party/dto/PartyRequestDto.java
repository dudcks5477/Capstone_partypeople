package com.partypeople.backend.domain.party.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

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
    //private List<MultipartFile> imageFiles;
}
