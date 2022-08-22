package com.example.bugtrackerapi.model;
import com.example.bugtrackerapi.model.User.User;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "projectID_gen")
    @SequenceGenerator(name = "projectID_gen", sequenceName = "PROJECT_ID", allocationSize = 1)
    private int projectId;

    private String title;
    private String description;

    @ManyToMany
    private List<User> contributors;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    private List<Ticket> ticketList;

    public Project(String title) {
        this.title = title;
        contributors = new ArrayList<>();
        ticketList = new ArrayList<>();
    }

    public Project(){
        contributors = new ArrayList<>();
        ticketList = new ArrayList<>();
    }

    public void addTicket(Ticket ticket) {
        ticketList.add(ticket);
    }

    public void removeTicket(Ticket ticket) {
        ticketList.remove(ticket);
    }

    public int getProjectId() {
        return projectId;
    }

    public void setProjectId(int projectId) {
        this.projectId = projectId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<User> getContributors() {
        return contributors;
    }

    public void setContributors(List<User> contributors) {
        this.contributors = contributors;
    }

    public List<Ticket> getTicketList() {
        return ticketList;
    }

    public void setTicketList(List<Ticket> ticketList) {
        this.ticketList = ticketList;
    }

    @Override
    public String toString() {
        return "Project{" +
                "projectId=" + projectId +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", contributors=" + contributors +
                ", ticketList=" + ticketList +
                '}';
    }
}
