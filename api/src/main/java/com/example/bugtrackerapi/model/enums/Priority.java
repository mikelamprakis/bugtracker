package com.example.bugtrackerapi.model.enums;

public enum Priority {
    LOW("LOW"),
    MEDIUM("MEDIUM"),
    HIGH("HIGH");

    private String name;

    private Priority(String status) {
        name = status;
    }

    public String getName() {
        return name;
    }
}
