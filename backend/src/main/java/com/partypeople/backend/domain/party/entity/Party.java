package com.partypeople.backend.domain.party.entity;

import com.partypeople.backend.domain.account.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import com.sun.istack.NotNull;


import javax.persistence.*;
import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Entity
public class Party {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private String place;

    //@NotNull
    //private int coin;

    @NotNull
    private String content;

    @ManyToMany
    private List<User> participants;

}