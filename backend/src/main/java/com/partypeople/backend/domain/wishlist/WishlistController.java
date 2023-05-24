package com.partypeople.backend.domain.wishlist;

import com.partypeople.backend.domain.party.entity.Party;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/wishlist")
public class WishlistController {
    private final WishlistService wishlistService;

    public WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    // 위시리스트에 파티 추가
    @PostMapping("/{userId}/add/{partyId}")
    public ResponseEntity<String> addPartyToWishlist(@PathVariable Long userId, @PathVariable Long partyId) {
        wishlistService.addPartyToWishlist(userId, partyId);
        return ResponseEntity.ok("Party added to wishlist successfully");
    }

    // 위시리스트 조회
    @GetMapping("/{userId}")
    public ResponseEntity<List<Party>> getWishlist(@PathVariable Long userId) {
        List<Party> wishlist = wishlistService.getWishlist(userId);
        return ResponseEntity.ok(wishlist);
    }

    // 위시리스트에서 파티 제거
    @PostMapping("/{userId}/remove/{partyId}")
    public ResponseEntity<String> removePartyFromWishlist(@PathVariable Long userId, @PathVariable Long partyId) {
        wishlistService.removePartyFromWishlist(userId, partyId);
        return ResponseEntity.ok("Party removed from wishlist successfully");
    }
}
