package com.example.bugtrackerapi.repository;

import com.example.bugtrackerapi.model.Ticket;
import com.example.bugtrackerapi.model.User.User;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class TicketDao implements DaoInterface<Ticket>{

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Transactional
    public void create(Ticket ticket) {
        entityManager.persist(ticket);
    }

    @Override
    @Transactional
    public Ticket update(Ticket ticket) {
        return entityManager.merge(ticket);
    }

    @Override
    @Transactional
    public void delete(Ticket ticket) {
        entityManager.remove(ticket);
    }

    @Override
    public Ticket findById(int id) {
        return entityManager.find(Ticket.class, id);
    }

    @Override
    public List<Ticket> findAll() {
        return entityManager.createQuery("SELECT t from Ticket t", Ticket.class).getResultList();
    }


    public<U extends User> List<Ticket> findByAssignedDeveloper(U developer){

        return  entityManager.createQuery("SELECT t FROM Ticket t JOIN t.assignedDevelopers devs WHERE devs.id = :developerID", Ticket.class)
                .setParameter("developerID", developer.getId())
                .getResultList();
    }


    public List<Ticket> findByUserSubmitted(User user){
        return entityManager.createQuery("SELECT t FROM Ticket t WHERE t.reportedByUser = :user", Ticket.class)
                .setParameter("user", user)
                .getResultList();
    }


}
