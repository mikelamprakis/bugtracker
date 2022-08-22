package com.example.bugtrackerapi.model.enums;

public enum UserType {

    DEV("DEV"),
    NON_DEV("NON-DEV");

    private String name;

    private UserType(String userType) {
        name = userType;
    }

    public String getName() {
        return name;
    }

}
