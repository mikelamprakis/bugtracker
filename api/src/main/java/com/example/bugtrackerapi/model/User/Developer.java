package com.example.bugtrackerapi.model.User;
import com.example.bugtrackerapi.model.enums.UserType;
import com.example.bugtrackerapi.model.enums.KnowledgeBase;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "DEVELOPER")
public class Developer extends User{

    @ElementCollection
    private List<KnowledgeBase> knowledgeBase;

    public Developer(){
        this.setUserType(UserType.DEV);
    }

    public Developer(String username, String email, String password) {
        super(username, email, password);
        knowledgeBase =  new ArrayList<>();
    }

    public List<KnowledgeBase> getKnowledgeBase() {
        return knowledgeBase;
    }

    public void setKnowledgeBase(List<KnowledgeBase> knowledgeBase) {
        this.knowledgeBase = knowledgeBase;
    }

    @Override
    public String toString() {
        return "Developer{" +
                "knowledgeBase=" + knowledgeBase +
                '}';
    }
}
