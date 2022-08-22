package com.example.bugtrackerapi.controller;


import com.example.bugtrackerapi.model.Project;
import com.example.bugtrackerapi.model.Ticket;
import com.example.bugtrackerapi.repository.ProjectDao;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDateTime;
import java.util.Collection;

@RestController
@RequestMapping("/api/v1/projects/")
@CrossOrigin("http://localhost:3000")
public class ProjectAPI {

    private final Logger logger = LogManager.getLogger(ProjectAPI.class);

    @Autowired
    private ProjectDao projectDao;


    @GetMapping("all")
    Collection<Project> projects() {
        return projectDao.findAll();
    }


    @GetMapping("get/{id}")
    ResponseEntity<?> getProject(@PathVariable("id") Integer id){
        Project project = projectDao.findById(id);
        if (project != null) {
            return ResponseEntity.ok().body(project);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PostMapping("create")
    ResponseEntity<Project> createProject(@RequestBody Project project) throws URISyntaxException {
        logger.info("Request to create project: {}", project);
        projectDao.create(project);
        return ResponseEntity.created(new URI("/api/projects/" + project.getProjectId())).body(project);
    }


    @PutMapping("update/{id}")
    ResponseEntity<Project> updateProject(@PathVariable int id,@RequestBody Project newProjectDetails){
        logger.info("Request to update project: {}", newProjectDetails);
        Project projectFromDB = projectDao.findById(id);

        if (!newProjectDetails.getTitle().equals("")){
            projectFromDB.setTitle(newProjectDetails.getTitle());
        }

        if (!newProjectDetails.getDescription().equals("")){
            projectFromDB.setDescription(newProjectDetails.getDescription());
        }

        if (newProjectDetails.getContributors().size() != 0){
            projectFromDB.setContributors(newProjectDetails.getContributors());
        }

        Project updatedProject = projectDao.update(projectFromDB);
        return ResponseEntity.ok(updatedProject);
    }


    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable int id){
        Project project = projectDao.findById(id);
        logger.info("Request to delete project: {}", project);
        projectDao.delete(project);
        return ResponseEntity.ok().build();
    }
}
