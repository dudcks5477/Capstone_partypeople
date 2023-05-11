package com.partypeople.backend.domain.party.service;

import com.partypeople.backend.domain.account.User;
import com.partypeople.backend.domain.account.UserRepository;
import com.partypeople.backend.domain.party.dto.PartyDto;
import com.partypeople.backend.domain.party.entity.Party;
import com.partypeople.backend.domain.party.repository.PartyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Transactional
@Service
public class PartyService {
    private final PartyRepository partyRepository;
    private final UserRepository userRepository;
    @Transactional
    public Party create(PartyDto partyDto, Long userId) {
        User organizer = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));
        Party party = partyDtoToEntity(partyDto);
        return partyRepository.save(party);
    }

    public PartyDto read(HttpServletRequest request, Long id) {
        Optional<Party> party = partyRepository.findById(id);
        //if (party.isEmpty()) {
        //throw new WrongPartyId();
        //}
        PartyDto partyDto = entityToPartyDto(party.get());

        return partyDto;
    }
    @Transactional
    public Party update(Long id, PartyDto partyDto) {
        Optional<Party> party = partyRepository.findById(id);
        ///if (booth.isEmpty()) {
        //   throw new WrongBoothId();
        //}
        long partyId = party.get().getId();
        partyDto.setId(partyId);
        Party updateParty = partyDtoToEntity(partyDto);
        partyRepository.save(updateParty);
        return updateParty;
    }

    @Transactional
    public String delete(Long id) {
        Optional<Party> party = partyRepository.findById(id);
        //if (booth.isEmpty()) {
        // throw new WrongBoothId();
        //}
        partyRepository.delete(party.get());
        return "Ok";
    }

    public void joinParty(Long partyId, Long userId) {
        Party party = partyRepository.findById(partyId).orElseThrow(() -> new IllegalArgumentException("Invalid party ID"));
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));
        party.getParticipants().add(user);
        // 참가자 관련 로직 추가

        partyRepository.save(party);
    }
    public Party partyDtoToEntity(PartyDto partyDto) {
        return Party.builder()
                .id(partyDto.getId())
                .name(partyDto.getName())
                .place(partyDto.getPlace())
                .content(partyDto.getContent())
                .build();
    }

    public PartyDto entityToPartyDto(Party party) {
        return PartyDto.builder()
                .id(party.getId())
                .name(party.getName())
                .place(party.getPlace())
                .content(party.getContent())
                .build();
    }
}