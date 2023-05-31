package com.partypeople.backend.domain.wishlist;

import com.partypeople.backend.domain.party.dto.PartyResponseDto;
import com.partypeople.backend.domain.party.entity.Party;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/wishlist")
public class WishlistController {
    private final WishlistService wishlistService;

    public WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    @PostMapping("/{userId}/add/{partyId}")
    public ResponseEntity<String> addPartyToWishlist(@PathVariable Long userId, @PathVariable Long partyId) {
        wishlistService.addPartyToWishlist(userId, partyId);
        return ResponseEntity.ok("Party added to wishlist successfully");
    }


    @GetMapping("/{userId}")
    public ResponseEntity<List<PartyResponseDto>> getWishlist(@PathVariable Long userId) {
        List<PartyResponseDto> wishlist = wishlistService.getWishlist(userId);
        return ResponseEntity.ok(wishlist);
    }


    @DeleteMapping("/{userId}/remove/{partyId}")
    public ResponseEntity<String> removePartyFromWishlist(@PathVariable Long userId, @PathVariable Long partyId) {
        wishlistService.removePartyFromWishlist(userId, partyId);
        return ResponseEntity.ok("Party removed from wishlist successfully");
    }
}