package com.example.bugtrackerapi.model;

import com.example.bugtrackerapi.model.User.Developer;
import com.example.bugtrackerapi.model.User.User;
import com.example.bugtrackerapi.model.enums.Status;
import com.example.bugtrackerapi.model.enums.Priority;
import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Table(name = "TICKET")
@Entity
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ticketID_gen")
    @SequenceGenerator(name = "ticketID_gen", sequenceName = "TICKET_ID", allocationSize = 1)
    private int ticketID;

    private String description;
    private String summary;

    @Column(updatable = false)
    private LocalDateTime dateCreated;

    private LocalDateTime dateUpdated;

    @OneToOne
    private User reportedByUser;

    @JoinColumn
    @ManyToMany (fetch = FetchType.LAZY)
    private List<Developer> assignedDevelopers;

    @Enumerated
    private Status status;

    @Enumerated
    private Priority priority;

    public Ticket(){}


    public Ticket(User reportedByUser, Project project, String summary, String description, Priority priority) {
        this.status = Status.NEW;
        this.priority = priority;
        this.summary = summary;
        this.description = description;
        this.reportedByUser = reportedByUser;
        dateCreated = LocalDateTime.now();
        assignedDevelopers = new ArrayList<>();
        project.addTicket(this);
    }

    public int getTicketID() {
        return ticketID;
    }

    public void setTicketID(int ticketID) {
        this.ticketID = ticketID;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public LocalDateTime getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(LocalDateTime dateCreated) {
        this.dateCreated = dateCreated;
    }

    public LocalDateTime getDateUpdated() {
        return dateUpdated;
    }

    public void setDateUpdated(LocalDateTime dateUpdated) {
        this.dateUpdated = dateUpdated;
    }

    public User getReportedByUser() {
        return reportedByUser;
    }

    public void setReportedByUser(User reportedByUser) {
        this.reportedByUser = reportedByUser;
    }

    public List<Developer> getAssignedDevelopers() {
        return assignedDevelopers;
    }

    public void setAssignedDevelopers(List<Developer> assignedDevelopers) {
        this.assignedDevelopers = assignedDevelopers;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    @Override
    public String toString() {
        return "Ticket{" +
                "ticketID=" + ticketID +
                ", description='" + description + '\'' +
                ", summary='" + summary + '\'' +
                ", dateCreated=" + dateCreated +
                ", dateUpdated=" + dateUpdated +
                ", reportedByUser=" + reportedByUser +
                ", assignedDevelopers=" + assignedDevelopers +
                ", status=" + status +
                ", priority=" + priority +
                '}';
    }
}
