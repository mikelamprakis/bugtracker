package com.example.bugtrackerapi.model.enums;


public enum KnowledgeBase {

    JAVA("JAVA"),
    SPRINGBOOT("SPRINGBOOT"),
    PYTHON("PYTHON"),
    JAVASCRIPT("JAVASCRIPT"),
    REACT("REACT"),
    SQL("SQL"),
    DOCKER("DOCKER"),
    KUBERNATES("KUBERNATES"),
    KAFKA("KAFKA"),
    ISTIO("ISTIO"),
    JENKINS("JENKINS")
    ;

    private String name;

    private KnowledgeBase(String techField) {
        name = techField;
    }

    public String getName() {
        return name;
    }
}
