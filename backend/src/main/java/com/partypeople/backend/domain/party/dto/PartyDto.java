package com.partypeople.backend.domain.party.dto;

import com.sun.istack.NotNull;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PartyDto {
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private String place;

    //@NotNull
    //private int coin;

    @NotNull
    private String content;

}