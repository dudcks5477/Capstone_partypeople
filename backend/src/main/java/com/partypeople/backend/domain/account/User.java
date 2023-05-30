package com.partypeople.backend.domain.account;

import com.partypeople.backend.domain.chat.entity.ChatRoom;
import lombok.*;
import com.partypeople.backend.domain.party.entity.Party;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.*;
import java.time.LocalDate;
import java.util.*;


@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private LocalDate birthDay;

    @ManyToMany(mappedBy = "participants")
    private Set<Party> parties = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "user_chat_room",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "chat_room_id")
    )
    private Set<ChatRoom> chatRooms = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "user_wishlist",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "party_id")
    )
    private List<Party> wishlist = new ArrayList<>();

    public void addToWishlist(Party party) {
        if (!this.wishlist.contains(party)) {
            this.wishlist.add(party);
            party.getUsers().add(this);
        }
    }

    private int experience;

    private  int level=1;

    public void addExperience(int experiencePoints) {
        this.experience += experiencePoints;
        checkLevelUp();
    }

    private void checkLevelUp() {
        int requiredExperience = (this.level + 1) * 100; // 예시 레벨업 조건
        if (this.experience >= requiredExperience) {
            this.level++;
            this.experience -= requiredExperience;
        }
    }

    private boolean enabled;
    private boolean accountNonExpired;
    private boolean accountNonLocked;
    private boolean credentialsNonExpired;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // 사용자의 권한 정보를 반환하는 메소드 구현
        return Collections.singleton(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getUsername() {

        return email;
    }

    @Override
    public String getPassword() {

        return password;
    }

    @Override
    public boolean isEnabled() {

        return enabled;
    }

    @Override
    public boolean isAccountNonExpired() {

        return accountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {

        return accountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {

        return credentialsNonExpired;
    }

}
