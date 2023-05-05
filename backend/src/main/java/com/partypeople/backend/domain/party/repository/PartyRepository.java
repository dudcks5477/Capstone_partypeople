package com.partypeople.backend.domain.party.repository;

import com.partypeople.backend.domain.party.entity.Party;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PartyRepository extends JpaRepository<Party, Long> {

}
