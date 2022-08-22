package com.example.bugtrackerapi.repository;

import com.example.bugtrackerapi.model.Project;
import com.example.bugtrackerapi.model.Ticket;
import com.example.bugtrackerapi.model.User.User;
import org.springframework.stereotype.Repository;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.List;

@Repository
public class DeveloperDao extends UserDao{

    @PersistenceContext
    private EntityManager entityManager;

    public List<User> findDevelopersByProject(Project project){
        List<Integer> developerIDs = new ArrayList<>(entityManager.createQuery("SELECT devs.id FROM Project p JOIN p.contributors devs WHERE p.projectId = :projectID", Integer.class)
                .setParameter("projectID", project.getProjectId())
                .getResultList());

        return  entityManager.createQuery("SELECT u FROM User u WHERE u.id IN :developerIDs", User.class)
                .setParameter("developerIDs", developerIDs)
                .getResultList();
    }

    public List<User> findDevelopersByAssignedTicket(Ticket ticket){
        List<Integer> developerIDs = new ArrayList<>(entityManager.createQuery("SELECT devs.id FROM Ticket t JOIN t.assignedDevelopers devs WHERE t.ticketID = :ticketID", Integer.class)
                .setParameter("ticketID", ticket.getTicketID())
                .getResultList());

        return  entityManager.createQuery("SELECT u FROM User u WHERE u.id IN :developerIDs", User.class)
                .setParameter("developerIDs", developerIDs)
                .getResultList();
    }
}
