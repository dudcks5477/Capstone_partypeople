package com.partypeople.backend.domain.party.controller;

import com.partypeople.backend.domain.account.User;
import com.partypeople.backend.domain.global.Exception.AccessDeniedException;
import com.partypeople.backend.domain.global.Exception.AlreadyJoinedException;
import com.partypeople.backend.domain.global.Exception.PartyNotFoundException;
import com.partypeople.backend.domain.global.Exception.UserNotFoundException;
import com.partypeople.backend.domain.party.dto.PartyRequestDto;
import com.partypeople.backend.domain.party.dto.PartyResponseDto;
import com.partypeople.backend.domain.party.entity.ImageDetail;
import com.partypeople.backend.domain.party.service.PartyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/party")
@RestController
public class PartyController {
    private final PartyService partyService;

    @PostMapping("/{userId}")
    public ResponseEntity<Long> createParty(@PathVariable Long userId, @RequestBody PartyRequestDto partyDto) {
        try {
            Long partyId = partyService.createParty(partyDto, userId);
            return new ResponseEntity<>(partyId, HttpStatus.CREATED);
        } catch (UserNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/{partyId}/images")
    public ResponseEntity<List<ImageDetail>> uploadPartyImages(@PathVariable Long partyId,
                                                               @RequestParam("images") List<MultipartFile> images) {
        try {
            List<ImageDetail> imageDetails = partyService.uploadPartyImages(partyId, images);
            return ResponseEntity.ok(imageDetails);
        } catch (PartyNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping(value = "/{partyId}/{userId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> updateParty(
            @PathVariable Long partyId,
            @PathVariable Long userId,
            @RequestPart("party") PartyRequestDto partyDto,
            @RequestPart("images") List<MultipartFile> images
    ) {
        try {
            partyService.updateParty(partyId, partyDto, userId, images);
            return ResponseEntity.noContent().build();
        } catch (PartyNotFoundException | AccessDeniedException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{partyId}/{userId}")
    public ResponseEntity<Void> deleteParty(@PathVariable Long partyId, @PathVariable Long userId) {
        partyService.deleteParty(partyId, userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{partyId}")
    public ResponseEntity<PartyResponseDto> getParty(@PathVariable Long partyId) {
        PartyResponseDto partyResponseDto = partyService.getParty(partyId);
        return ResponseEntity.ok(partyResponseDto);
    }

    @PostMapping("/{partyId}/join/{userId}")
    public ResponseEntity<?> joinParty(@PathVariable Long partyId, @PathVariable Long userId) {
        try {
            partyService.joinParty(partyId, userId);
            return ResponseEntity.ok().build();
        } catch (PartyNotFoundException | UserNotFoundException | AlreadyJoinedException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (AccessDeniedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<PartyResponseDto>> getAllParties() {
        List<PartyResponseDto> partyResponseDtos = partyService.getAllParties();
        return ResponseEntity.ok(partyResponseDtos);
    }


}