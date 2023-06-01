package com.partypeople.backend.domain.party.controller;

import com.partypeople.backend.domain.global.Exception.AccessDeniedException;
import com.partypeople.backend.domain.global.Exception.AlreadyJoinedException;
import com.partypeople.backend.domain.global.Exception.PartyNotFoundException;
import com.partypeople.backend.domain.global.Exception.UserNotFoundException;
import com.partypeople.backend.domain.global.security.UserPrincipal;
import com.partypeople.backend.domain.party.dto.PartyDto;
import com.partypeople.backend.domain.party.dto.PartyRequestDto;
import com.partypeople.backend.domain.party.dto.PartyResponseDto;
import com.partypeople.backend.domain.party.entity.Party;
import com.partypeople.backend.domain.party.repository.PartyRepository;
import com.partypeople.backend.domain.party.service.PartyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.net.URI;
import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/party")
@RestController
public class PartyController {
    private final PartyService partyService;
    private final PartyRepository partyRepository;

    private static final String UPLOAD_DIR = "src/main/resources";
    @PostMapping
    public ResponseEntity<Void> createParty(@RequestBody PartyRequestDto requestDto, Long userId) {
        Long partyId = partyService.createParty(requestDto, userId);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{partyId}")
                .buildAndExpand(partyId)
                .toUri();
        return ResponseEntity.created(location).build();
    }

    @PutMapping("/{partyId}")
    public ResponseEntity<Void> updateParty(@PathVariable Long partyId, @RequestBody PartyRequestDto requestDto, Authentication authentication) {
        Long userId = getUserIdFromAuthentication(authentication);
        partyService.updateParty(partyId, requestDto, userId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{partyId}")
    public ResponseEntity<Void> deleteParty(@PathVariable Long partyId, Authentication authentication) {
        Long userId = getUserIdFromAuthentication(authentication);
        partyService.deleteParty(partyId, userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{partyId}")
    public ResponseEntity<PartyResponseDto> getParty(@PathVariable Long partyId) {
        PartyResponseDto partyResponseDto = partyService.getParty(partyId);
        return ResponseEntity.ok(partyResponseDto);
    }

    @PostMapping("/party/{partyId}/join")
    public ResponseEntity<?> joinParty(@PathVariable Long partyId, Authentication authentication) {
        try {
            Long userId = getUserIdFromAuthentication(authentication);

            partyService.joinParty(partyId, userId);

            return ResponseEntity.ok().build();
        } catch (PartyNotFoundException | UserNotFoundException | AlreadyJoinedException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (AccessDeniedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }
    }

    @PostMapping("/{partyId}/upload-image")
    public ResponseEntity<String> uploadPartyImage(@PathVariable Long partyId, @RequestParam("imageFile") MultipartFile imageFile) {
        Party party = partyRepository.findById(partyId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid party ID"));

        try {
            party.uploadImageFile();
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload image");
        }

        partyRepository.save(party);

        return ResponseEntity.ok("Image uploaded successfully");

        /*
        @GetMapping("/{partyId}/image")
        public ResponseEntity<Resource> viewPartyImage(@PathVariable Long partyId) {
            Party party = partyService.getPartyById(partyId);
            if (party == null) {
                return ResponseEntity.notFound().build();
            }

            String imageName = party.getImageName();

            try {
                Path imagePath = Paths.get(UPLOAD_DIR).resolve(imageName).normalize();
                Resource resource = new UrlResource(imagePath.toUri());

                if (resource.exists() && resource.isReadable()) {
                    return ResponseEntity.ok()
                            .contentType(MediaType.IMAGE_JPEG)
                            .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                            .body(resource);
                } else {
                    return ResponseEntity.notFound().build();
                }
            } catch (MalformedURLException e) {
                return ResponseEntity.notFound().build();
            }
        }

         */
    }
    @GetMapping
    public ResponseEntity<List<PartyResponseDto>> getAllParties() {
        List<PartyResponseDto> partyResponseDtos = partyService.getAllParties();
        return ResponseEntity.ok(partyResponseDtos);
    }

    private Long getUserIdFromAuthentication(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        return userPrincipal.getId();
    }




}