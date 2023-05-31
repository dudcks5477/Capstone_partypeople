package com.partypeople.backend.domain.wishlist;

import com.partypeople.backend.domain.account.User;
import com.partypeople.backend.domain.account.UserRepository;
import com.partypeople.backend.domain.global.Exception.PartyNotFoundException;
import com.partypeople.backend.domain.global.Exception.UserNotFoundException;
import com.partypeople.backend.domain.party.dto.PartyResponseDto;
import com.partypeople.backend.domain.party.entity.Party;
import com.partypeople.backend.domain.party.repository.PartyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class WishlistService {
    private final UserRepository userRepository;
    private final PartyRepository partyRepository;



    @Transactional
    public void addPartyToWishlist(Long userId, Long partyId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + userId));
        Party party = partyRepository.findById(partyId)
                .orElseThrow(() -> new PartyNotFoundException("Party not found with ID: " + partyId));

        user.getWishlist().add(party);
        party.getUsers().add(user);
    }


    public List<PartyResponseDto> getWishlist(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + userId));

        List<Party> wishlistParties = user.getWishlist();

        return wishlistParties.stream()
                .map(PartyResponseDto::new)
                .collect(Collectors.toList());
    }


    @Transactional
    public void removePartyFromWishlist(Long userId, Long partyId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + userId));

        Party party = partyRepository.findById(partyId)
                .orElseThrow(() -> new PartyNotFoundException("Party not found with ID: " + partyId));

        user.getWishlist().remove(party);
        party.getUsers().remove(user);
    }
}