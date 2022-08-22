package com.example.bugtrackerapi.model.enums;


public enum Roles {
    DEVELOPER("DEVELOPER"),
    ADMIN("ADMIN"),
    PROJECT_MANAGER("PROJECT MANAGER");
    private String name;

    private Roles(String type) {
        name = type;
    }

    public String getName() {
        return name;
    }

}
