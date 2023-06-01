package com.partypeople.backend.domain.wishlist;

import com.partypeople.backend.domain.account.User;
import com.partypeople.backend.domain.account.UserRepository;
import com.partypeople.backend.domain.global.Exception.PartyNotFoundException;
import com.partypeople.backend.domain.global.Exception.UserNotFoundException;
import com.partypeople.backend.domain.party.entity.Party;
import com.partypeople.backend.domain.party.repository.PartyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@RequiredArgsConstructor
@Service
public class WishlistService {
    private final UserRepository userRepository;
    private final PartyRepository partyRepository;


    // 위시리스트에 파티 추가
    public void addPartyToWishlist(Long userId, Long partyId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("User not found with ID: " + userId));
        Party party = partyRepository.findById(partyId).orElseThrow(() -> new PartyNotFoundException("Party not found with ID: " + partyId));

        List<Party> wishlist = user.getWishlist();
        if (wishlist == null) {
            wishlist = new ArrayList<>();
        }

        if (!wishlist.contains(party)) {
            wishlist.add(party);
            user.setWishlist(wishlist);
            userRepository.save(user);
        }
    }

    // 위시리스트 조회
    public List<Party> getWishlist(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("User not found with ID: " + userId));
        return user.getWishlist();
    }

    // 위시리스트에서 파티 제거
    public void removePartyFromWishlist(Long userId, Long partyId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("Party not found with ID: " + partyId));

        List<Party> wishlist = user.getWishlist();
        if (wishlist != null && wishlist.size() > 0) {
            Party partyToRemove = wishlist.stream()
                    .filter(party -> party.getId().equals(partyId))
                    .findFirst()
                    .orElseThrow(() -> new PartyNotFoundException("Party not found with ID: " + partyId));

            wishlist.remove(partyToRemove);
            user.setWishlist(wishlist);
            userRepository.save(user);
        }
    }
}
