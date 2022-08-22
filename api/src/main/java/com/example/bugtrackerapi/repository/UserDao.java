package com.example.bugtrackerapi.repository;

import com.example.bugtrackerapi.model.Ticket;
import com.example.bugtrackerapi.model.User.User;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class UserDao implements DaoInterface<User>{

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Transactional
    public void create(User user) {
        entityManager.persist(user);
    }

    @Override
    @Transactional
    public User update(User user) {
        return entityManager.merge(user);
    }

    @Override
    @Transactional
    public void delete(User user) {
        entityManager.remove(user);
    }

    @Override
    public User findById(int id) {
        return entityManager.find(User.class, id);
    }

    @Override
    public List<? extends User> findAll() {
        return entityManager.createQuery("SELECT u from User u", User.class).getResultList();
    }

    public User findByUserName(String userName) {
        return entityManager.createQuery("SELECT u FROM User u where u.username= :userName", User.class)
                .setParameter("userName", userName)
                .getSingleResult();
    }

    public User findByEmail(String email) {
        return entityManager.createQuery("SELECT u FROM User u where u.email= :email", User.class)
                .setParameter("email", email)
                .getSingleResult();
    }

    public User findByUsernameAndPassword(String username, String password) {
        try{
            return  entityManager.createQuery("SELECT u FROM User u where u.username= :username AND u.password= :password", User.class)
                    .setParameter("username", username)
                    .setParameter("password", password)
                    .getSingleResult();
        }catch(Exception e) {
            return null;
        }
    }

    public User findBySubmittedTicket(Ticket ticket){
        return ticket.getReportedByUser();
    }

    public <U extends User> List<User> findByUserType(Class<U> userClass){
     return entityManager.createQuery("SELECT u FROM User u WHERE TYPE(u) = :type", User.class)
             .setParameter("type", userClass)
             .getResultList();
    }
}
