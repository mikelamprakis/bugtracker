package com.example.bugtrackerapi.model.enums;

public enum Status {
    SOLVED("SOLVED"),
    NEW("NEW"),
    ASSIGNED("ASSIGNED");

    private String name;

    private Status(String status) {
        name = status;
    }

    public String getName() {
        return name;
    }
}
