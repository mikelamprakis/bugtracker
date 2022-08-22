package com.example.bugtrackerapi;

import com.example.bugtrackerapi.model.Project;
import com.example.bugtrackerapi.model.Ticket;
import com.example.bugtrackerapi.model.User.Admin;
import com.example.bugtrackerapi.model.User.Developer;
import com.example.bugtrackerapi.model.User.User;
import com.example.bugtrackerapi.model.enums.Roles;
import com.example.bugtrackerapi.model.enums.Status;
import com.example.bugtrackerapi.repository.ProjectDao;
import com.example.bugtrackerapi.repository.TicketDao;
import com.example.bugtrackerapi.repository.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;

@SpringBootApplication
public class BugTrackerApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(BugTrackerApiApplication.class, args);
	}

	@Autowired
	private ProjectDao projectDao;

	@Autowired
	private TicketDao ticketDao;

	@Autowired
	private UserDao userDao;

	@Bean
	CommandLineRunner commandLineRunner(){
		return args -> {

			ArrayList listOfRoles = new ArrayList();
			listOfRoles.add(Roles.PROJECT_MANAGER);
			listOfRoles.add(Roles.ADMIN);
			listOfRoles.add(Roles.DEVELOPER);

			// Creating user with admin rights
			Developer user1 = new Developer();
			user1.setUsername("James");
			user1.setPassword("james123");
			user1.setEmail("kashdaksh@kjhak.com");
			user1.setRoles(listOfRoles);
			userDao.create(user1);

			// Creating user without admin rights
			Developer user2 = new Developer();
			user2.setUsername("Cindy");
			user2.setPassword("cindy123");
			user2.setEmail("cindy@kjhak.com");
			listOfRoles.remove(Roles.ADMIN);
			user2.setRoles(listOfRoles);
			userDao.create(user2);


			// Creating ticket 1
			Ticket ticket1 = new Ticket();
			ticket1.setStatus(Status.NEW);
			ticket1.setDescription("The DB node is not able to get resources on IKP, even when scaling down other services");
			ticket1.setSummary("Node is not getting resources in IKP");
			ticket1.setReportedByUser(user1);

			LocalDateTime now = LocalDateTime.now();
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
			String formatDateTime = now.format(formatter);
			ticket1.setDateCreated(LocalDateTime.parse(formatDateTime,formatter));

			ArrayList<Developer> assignedDevs = new ArrayList<>();
			assignedDevs.add(user1);
			assignedDevs.add(user2);
			ticket1.setAssignedDevelopers(assignedDevs);
			ticketDao.create(ticket1);

			// Creating ticket 2
			Ticket ticket2 = new Ticket();
			ticket2.setStatus(Status.NEW);
			ticket2.setDescription("When hitting the create/user endpoint the user-creation service throws a NPE");
			ticket2.setSummary("NullPointerException in create/user endpoint");
			ticket2.setReportedByUser(user1);
			ticket2.setDateCreated(LocalDateTime.parse(formatDateTime,formatter));
			ticketDao.create(ticket2);

			// Creating project 1
			Project project1 = new Project();
			project1.setDescription("This project is a CRM system which manages contacts and stores user data for various operations");
			project1.setTitle("CRM System");
			project1.addTicket(ticket1);
			projectDao.create(project1);

			// Creating project 2
			Project project2 = new Project();
			project2.setDescription("This project is about a configurable chatbot which is configurable by the admin to consume and provide data to the user");
			project2.setTitle("Configurable chatbot");
			project2.addTicket(ticket2);
			projectDao.create(project2);

		};
	}
}
