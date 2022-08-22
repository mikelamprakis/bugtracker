package com.example.bugtrackerapi.model.User;
import com.example.bugtrackerapi.model.enums.KnowledgeBase;
import com.example.bugtrackerapi.model.enums.Roles;
import com.example.bugtrackerapi.model.enums.UserType;
import javax.persistence.*;
import java.util.Arrays;
import java.util.List;


@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "userID_gen")
    @SequenceGenerator(name = "userID_gen", sequenceName = "USER_ID", allocationSize = 1)
    private int id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @ElementCollection
    private List<Roles> roles;

    @Enumerated
    private UserType userType;

    @Transient
    private List<KnowledgeBase> knowledgeBase;

    public User(){};

    public User(String username, String email, String password){
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public List<Roles> getRoles() {
        return roles;
    }

    public void setRoles(List<Roles> roles) {
        this.roles = roles;
    }

    public UserType getUserType() {
        return userType;
    }

    public void setUserType(UserType userType) {
        this.userType = userType;
    }

    public List<KnowledgeBase> getKnowledgeBase() {
        return knowledgeBase;
    }

    public void setKnowledgeBase(List<KnowledgeBase> knowledgeBase) {
        this.knowledgeBase = knowledgeBase;
    }

    @Override
    public String toString() {
        return "User{" +
                ", id=" + id +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", accountTypes=" + roles +
                '}';
    }
}
