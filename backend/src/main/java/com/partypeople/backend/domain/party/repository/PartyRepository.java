package com.partypeople.backend.domain.party.repository;

import com.partypeople.backend.domain.party.entity.Party;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface PartyRepository extends JpaRepository<Party, Long> {

}