package com.partypeople.backend.domain.account;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.*;
import java.time.LocalDate;


@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private LocalDate birthDay;

    private int experience;

    private  int level=1;

    public void addExperience(int experiencePoints) {
        this.experience += experiencePoints;
        checkLevelUp();
    }

    private void checkLevelUp() {
        int requiredExperience = (this.level + 1) * 100; // 예시 레벨업 조건
        if (this.experience >= requiredExperience) {
            this.level++;
            this.experience -= requiredExperience;
        }
    }
}
