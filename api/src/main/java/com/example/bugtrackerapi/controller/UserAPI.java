package com.example.bugtrackerapi.controller;

import com.example.bugtrackerapi.model.Project;
import com.example.bugtrackerapi.model.Ticket;
import com.example.bugtrackerapi.model.User.Admin;
import com.example.bugtrackerapi.model.User.Developer;
import com.example.bugtrackerapi.model.User.User;
import com.example.bugtrackerapi.model.enums.Roles;
import com.example.bugtrackerapi.repository.ProjectDao;
import com.example.bugtrackerapi.repository.UserDao;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/v1/users/")
public class UserAPI {

    private final Logger logger = LogManager.getLogger(UserAPI.class);

    @Autowired
    private UserDao userDao;

    @Autowired
    private ProjectDao projectDao;


    @GetMapping("all")
    Collection<? extends User> users() {
        return userDao.findAll();
    }


    @GetMapping("get/{id}")
    ResponseEntity<?> getUser(@PathVariable("id") Integer id) {
        User user = userDao.findById(id);
        if (user != null) {
            return ResponseEntity.ok().body(user);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PostMapping("user/login")
    public ResponseEntity<?> getUserByUserNameAndPassword(@RequestBody User userCredentials){
        Optional<User> userFromDB = Optional.ofNullable(userDao.findByUsernameAndPassword(userCredentials.getUsername(), userCredentials.getPassword()));
        if (!userFromDB.isPresent() || userFromDB.get() == null ) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(userFromDB);
    }


    @PostMapping("create")
    ResponseEntity<User> createUser(@RequestBody User user) throws URISyntaxException {
        logger.info("Request to create user: {}", user);
        boolean isDeveloper = false;
        for (Roles role : user.getRoles()){
            logger.info("TYPE OF USER : {}" , role.getName());
            if (role.getName().equals("DEVELOPER")){
                isDeveloper = true;
            }
        }

        if (isDeveloper) {
            logger.info("ITS A DEV");
            Developer newUser = new Developer();
            newUser.setUsername(user.getUsername());
            newUser.setPassword(user.getPassword());
            newUser.setEmail(user.getEmail());
            newUser.setRoles(user.getRoles());
            newUser.setKnowledgeBase(user.getKnowledgeBase());
            userDao.create(newUser);
        }else{
            logger.info("ITS A NON DEV");
            Admin newUser = new Admin();
            newUser.setUsername(user.getUsername());
            newUser.setPassword(user.getPassword());
            newUser.setEmail(user.getEmail());
            newUser.setRoles(user.getRoles());
            userDao.create(newUser);
        }
        return ResponseEntity.created(new URI("/api/users/" + user.getId())).body(user);
    }

    @PutMapping("update")
    ResponseEntity<User> updateUser(@RequestBody User user) {
        logger.info("Request to update user: {}", user);
        userDao.update(user);
        return ResponseEntity.ok().body(user);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable int id) {
        User user = userDao.findById(id);
        logger.info("Request to delete user: {}", user);
        userDao.delete(user);
        return ResponseEntity.ok().build();
    }

    @GetMapping("getByProject/{id}")
    ResponseEntity<?> getContributors(@PathVariable("id") Integer id) {
        Project project = projectDao.findById(id);
        if (project != null) {
            List<User> userList = project.getContributors();
            if (userList.size() == 0) {
                List<Ticket> empty = new ArrayList<>();
                return ResponseEntity.ok().body(empty);
            }else {
                return ResponseEntity.ok().body(userList);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
