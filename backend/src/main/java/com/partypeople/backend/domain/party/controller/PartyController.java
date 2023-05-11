package com.partypeople.backend.domain.party.controller;

import com.partypeople.backend.domain.party.dto.PartyDto;
import com.partypeople.backend.domain.party.entity.Party;
import com.partypeople.backend.domain.party.repository.PartyRepository;
import com.partypeople.backend.domain.party.service.PartyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RequiredArgsConstructor
@RequestMapping("/party")
@RestController
public class PartyController {
    private final PartyService partyService;
    private final PartyRepository partyRepository;

    private static final String UPLOAD_DIR = "src/main/resources";
    @PostMapping()
    public Party createParty(@RequestBody PartyDto partyDto, @RequestParam Long userId) {
        return partyService.create(partyDto, userId);
    }

    @GetMapping("{id}")
    public PartyDto partyRead(HttpServletRequest request, @PathVariable Long id) {
        return partyService.read(request, id);
    }

    @PutMapping("{id}")
    public Party partyUpdate(@PathVariable Long id, @RequestBody PartyDto partyDto) {
        return partyService.update(id, partyDto);
    }

    @DeleteMapping("{id}")
    public String partyDelete(@PathVariable Long id) {
        return partyService.delete(id);
    }

    @PostMapping("/{partyId}/join/{userId}")
    public void joinParty(@PathVariable Long partyId, @RequestBody Long userId) {
        partyService.joinParty(partyId, userId);
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


}