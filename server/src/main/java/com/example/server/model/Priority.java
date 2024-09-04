/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.model;

/**
 *
 * @author luis.renteria
 */
public enum Priority {
    HIGH, MEDIUM, LOW;

    @Override
    public String toString() {
        return name();
    }
    
    public static String getPriorityDescription(Priority priority) {
        return switch (priority) {
            case HIGH -> "High";
            case MEDIUM -> "Medium";
            case LOW -> "Low";
            default -> "";
        };
}
}