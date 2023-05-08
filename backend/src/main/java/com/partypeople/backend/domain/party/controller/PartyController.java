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
    public Integer createParty(@RequestBody PartyDto partyDto) {
        Party party = partyService.create(partyDto);
        return HttpStatus.OK.value();
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

}