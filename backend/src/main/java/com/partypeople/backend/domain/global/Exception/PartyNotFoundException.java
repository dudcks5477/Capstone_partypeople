package com.partypeople.backend.domain.global.Exception;

public class PartyNotFoundException extends RuntimeException {
    public PartyNotFoundException(Long partyId) {
        super("Party not found with ID: " + partyId);
    }
}
