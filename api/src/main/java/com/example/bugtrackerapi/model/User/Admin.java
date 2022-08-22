package com.example.bugtrackerapi.model.User;
import com.example.bugtrackerapi.model.enums.UserType;
import javax.persistence.Entity;

@Entity
public class Admin extends User{

    public Admin() {
        super();
        this.setUserType(UserType.NON_DEV);
    }
}
