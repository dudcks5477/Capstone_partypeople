package com.partypeople.backend.domain.chat.entity;

import com.partypeople.backend.domain.account.User;
import com.partypeople.backend.domain.party.entity.Party;
import lombok.*;
import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Entity
public class ChatRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "party_id")
    private Party party;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "host_id")
    private User host;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "chat_room_participant",
            joinColumns = @JoinColumn(name = "chat_room_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> participants = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "chat_room_party",
            joinColumns = @JoinColumn(name = "chat_room_id"),
            inverseJoinColumns = @JoinColumn(name = "party_id")
    )
    private Set<Party> parties = new HashSet<>();

    public void setParticipants(Set<User> participants) {
        this.participants = participants;
    }

    public void setParties(Set<Party> parties) {
        this.parties = parties;
    }

    public ChatRoom(Party party, User host, Set<User> participants, Set<Party> parties) {
        this.party = party;
        this.host = host;
        this.participants = participants;
        this.parties = parties;
    }
}