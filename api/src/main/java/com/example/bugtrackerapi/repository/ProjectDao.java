package com.example.bugtrackerapi.repository;

import com.example.bugtrackerapi.model.Project;
import com.example.bugtrackerapi.model.Ticket;
import com.example.bugtrackerapi.model.User.User;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class ProjectDao implements DaoInterface<Project>{

    @PersistenceContext
    private EntityManager entityManager;


    @Override
    @Transactional
    public void create(Project project) {
        entityManager.persist(project);
    }

    @Override
    @Transactional
    public Project update(Project project) {
        return entityManager.merge(project);
    }

    @Override
    @Transactional
    public void delete(Project project) {
        entityManager.remove(project);
    }

    @Override
    public Project findById(int id) {
        return entityManager.find(Project.class, id);
    }

    @Override
    public List<Project> findAll() {
        return entityManager.createQuery("SELECT p from Project p", Project.class).getResultList();
    }

    public <U extends User> List<Project> findByContributor(U developer){
        return entityManager.createQuery("SELECT p FROM Project p JOIN p.contributors devs WHERE devs.id = :developerID", Project.class).setParameter("developerID", developer.getId()).getResultList();
    }

    public Project findByTicket(Ticket ticket){
        return entityManager.createQuery("SELECT p FROM Project p JOIN fetch p.ticketList tl WHERE tl.ticketID = :id", Project.class).setParameter("id", ticket.getTicketID()).getSingleResult();
    }

}
