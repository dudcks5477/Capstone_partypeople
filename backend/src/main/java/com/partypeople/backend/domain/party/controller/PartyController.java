package com.partypeople.backend.domain.party.controller;

import com.partypeople.backend.domain.party.service.PartyService;
import org.springframework.web.bind.annotation.PostMapping;

public class PartyController {
    PartyService partyservice;
    @PostMapping()
    public String partyCreate(){
        return("hello");
        //partyservice.create();
    }
}
