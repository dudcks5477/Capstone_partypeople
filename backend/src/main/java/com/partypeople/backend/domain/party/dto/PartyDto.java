/*package com.partypeople.backend.domain.party.dto;

import com.partypeople.backend.domain.account.User;
import com.sun.istack.NotNull;
import lombok.*;

import javax.persistence.ManyToMany;
import java.util.List;

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

    @NotNull
    private Long  numOfPeople;

    @NotNull


    @ManyToMany
    private List<User> participants;



}

 */