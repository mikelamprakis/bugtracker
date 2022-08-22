package com.example.bugtrackerapi.controller;

import com.example.bugtrackerapi.model.Project;
import com.example.bugtrackerapi.model.Ticket;
import com.example.bugtrackerapi.model.User.Developer;
import com.example.bugtrackerapi.model.User.User;
import com.example.bugtrackerapi.repository.ProjectDao;
import com.example.bugtrackerapi.repository.TicketDao;
import com.example.bugtrackerapi.repository.UserDao;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.net.URISyntaxException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/api/v1/tickets/")
@CrossOrigin("http://localhost:3000")
public class TicketAPI {

    private final Logger logger = LogManager.getLogger(TicketAPI.class);

    @Autowired
    private TicketDao ticketDao;

    @Autowired
    private ProjectDao projectDao;

    @Autowired
    private UserDao userDao;


    @GetMapping("all")
    Collection<Ticket> tickets() {
        return ticketDao.findAll();
    }


    @GetMapping("get/{id}")
    ResponseEntity<?> getTicket(@PathVariable("id") Integer id) {
        Ticket ticket = ticketDao.findById(id);
        if (ticket != null) {
            return ResponseEntity.ok().body(ticket);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping("getByProject/{projectID}")
    ResponseEntity<?> getTicketByProject(@PathVariable("projectID") Integer id){
        Project project = projectDao.findById(id);
        if(project != null) {
            List<Ticket> ticketList = project.getTicketList();
            if (ticketList.size() == 0) {
                List<Ticket> empty = new ArrayList<>();
                return ResponseEntity.ok().body(empty);
            }else  { return ResponseEntity.ok().body(ticketList);}
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping("getByUserSubmitted/{userID}")
    ResponseEntity<?> getTicketByUserSubmitted(@PathVariable("userID") Integer id) {
        User user = userDao.findById(id);
        if (user != null) {
            List<Ticket> ticketList = ticketDao.findByUserSubmitted(user);
            if (ticketList.size() == 0) {
                List<Ticket> empty = new ArrayList<>();
                return ResponseEntity.ok().body(empty);
            } else {
                return ResponseEntity.ok().body(ticketList);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping("getByUserContributor/{userID}")
    ResponseEntity<?> getTicketByUserContributor(@PathVariable("userID") Integer id) {
        User user = userDao.findById(id);
        if (user != null) {
            List<Ticket> ticketList = ticketDao.findByAssignedDeveloper(user);
            if (ticketList.size() == 0) {
                List<Ticket> empty = new ArrayList<>();
                return ResponseEntity.ok().body(empty);
            } else {
                return ResponseEntity.ok().body(ticketList);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PostMapping("create/{userID}/{projectID}")
    ResponseEntity<Ticket> createTicket( @PathVariable("userID") Integer userId,
                                         @PathVariable("projectID") Integer projectid,
                                         @RequestBody Ticket ticketDetails)throws URISyntaxException {
        logger.info("Request to create ticket: {}", ticketDetails);
        Ticket ticket = new Ticket();
        ticket.setSummary(ticketDetails.getSummary());
        ticket.setDescription(ticketDetails.getDescription());
        ticket.setStatus(ticketDetails.getStatus());
        ticket.setPriority(ticketDetails.getPriority());

        ArrayList<Developer> assignedDevs = new ArrayList<>();
        for (Developer dev : ticketDetails.getAssignedDevelopers()){
            assignedDevs.add(dev);
        }
        ticket.setAssignedDevelopers(assignedDevs);

        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formatDateTime = now.format(formatter);

        ticket.setDateCreated(LocalDateTime.parse(formatDateTime,formatter));
        ticket.setReportedByUser(userDao.findById(userId));
        ticketDao.create(ticket);

        Project project = projectDao.findById(projectid);
        project.addTicket(ticket);
        projectDao.update(project);

        return ResponseEntity.ok(ticket);
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<Ticket> updateTicket(@PathVariable int id,
                                               @RequestBody Ticket newTicketDetails){
        Ticket ticketFromDB = ticketDao.findById(id);

        if (!newTicketDetails.getSummary().equals("")){
            ticketFromDB.setSummary(newTicketDetails.getSummary());
        }

        if (!newTicketDetails.getDescription().equals("")){
            ticketFromDB.setDescription(newTicketDetails.getDescription());
        }

        if (newTicketDetails.getStatus() != null){
            ticketFromDB.setStatus(newTicketDetails.getStatus());
        }

        if (newTicketDetails.getPriority() != null){
            ticketFromDB.setPriority(newTicketDetails.getPriority());
        }

        if (newTicketDetails.getStatus()!=null || newTicketDetails.getPriority()!=null || !newTicketDetails.getDescription().equals("") || !newTicketDetails.getSummary().equals("")){
            ticketFromDB.setDateUpdated(LocalDateTime.now());
        }

        Ticket updatedTicket = ticketDao.update(ticketFromDB);
        return ResponseEntity.ok(updatedTicket);
    }


    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteTicket(@PathVariable int id) {
        Ticket ticket = ticketDao.findById(id);
        logger.info("Request to delete ticket: {}", ticket);
        ticketDao.delete(ticket);
        return ResponseEntity.ok().build();
    }
}
