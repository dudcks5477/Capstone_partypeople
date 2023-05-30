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

    @ManyToMany(mappedBy = "chatRooms")
    private Set<User> participants = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "chat_room_party",
            joinColumns = @JoinColumn(name = "chat_room_id"),
            inverseJoinColumns = @JoinColumn(name = "party_id")
    )
    private Set<Party> parties = new HashSet<>();

    public Set<User> getParticipants() {
        Set<User> participants = new HashSet<>();
        for (Party party : parties) {
            participants.addAll(party.getParticipants());
        }
        return participants;
    }
}
