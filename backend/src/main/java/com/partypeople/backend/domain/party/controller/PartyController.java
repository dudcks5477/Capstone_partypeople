package com.partypeople.backend.domain.party.controller;

import com.partypeople.backend.domain.party.dto.PartyDto;
import com.partypeople.backend.domain.party.entity.Party;
import com.partypeople.backend.domain.party.service.PartyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RequiredArgsConstructor
@RequestMapping("/party")
@RestController
public class PartyController {
    private final PartyService partyService;
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

}