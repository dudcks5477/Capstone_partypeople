package com.partypeople.backend.domain.chat.repository;

import com.partypeople.backend.domain.chat.entity.Message;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Repository
public abstract class DatabaseMessageRepository implements MessageRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public <S extends Message> S save(S message) {
        entityManager.persist(message);
        return message;
    }

    @Override
    public List<Message> findAll() {
        return entityManager.createQuery("SELECT m FROM Message m", Message.class)
                .getResultList();
    }
}

