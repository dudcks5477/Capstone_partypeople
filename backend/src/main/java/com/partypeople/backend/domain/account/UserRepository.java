package com.partypeople.backend.domain.account;

import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);

    User findByNameAndBirthDay(String name, LocalDate birthDay);
    @NonNull
    Optional<User> findById(Long id);
}
