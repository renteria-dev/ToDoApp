/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 *
 * @author luis.renteria
 */
public class Todo {

    private Long id;
    private String text;
    private String priority;
    private LocalDateTime creationDate;

    private boolean done;
    private LocalDate dueDate;
    private LocalDate doneDate;

    @JsonCreator
    public Todo(Long id, String text, String priority) {
        System.out.println(text);
        if (validateText(text) == false) {
            throw new IllegalArgumentException("Text is not valid");
        }
        if (validatePriority(priority) == false) {
            throw new IllegalArgumentException("Priority is not valid");
        }
        this.id = id;
        this.text = text;
        this.priority = priority;
        this.creationDate = LocalDateTime.now();

    }

    public Todo(Long id, String text, String priority, LocalDate dueDate) {
        if (validateText(text) == false) {
            throw new IllegalArgumentException("Text is not valid");
        }
        if (validatePriority(priority) == false) {
            throw new IllegalArgumentException("Priority is not valid");
        }

        this.id = id;
        this.text = text;
        this.dueDate = dueDate;
        this.priority = priority;
        this.creationDate = LocalDateTime.now();

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        if (text == null || text.length() > 120) {
            throw new IllegalArgumentException("Text is not valid");
        } else {
            this.text = text;
        }
    }

    public final Boolean validatePriority(String priority) {
        switch (priority) {
            case "HIGH" -> {
                return true;
            }
            case "MEDIUM" -> {
                return true;
            }
            case "LOW" -> {
                return true;
            }
        }
        return false;
    }

    public final Boolean validateText(String text) {
        return !(text == null || text.length() > 120);
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public boolean isDone() {
        return done;
    }

    public void setDone(boolean done) {
        this.done = done;

        if (done) {
            this.doneDate = LocalDate.now();
        } else {
            this.doneDate = null;
        }

    }

    public LocalDate getDoneDate() {
        return doneDate;
    }

    public void setDoneDate(LocalDate doneDate) {
        this.doneDate = doneDate;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDateTime creationDate) {
        this.creationDate = creationDate;
    }

    @Override
    public String toString() {
        return "Todo{"
                + "id='" + id + '\''
                + ", text='" + text + '\''
                + ", dueDate=" + dueDate
                + ", done=" + done
                + ", doneDate=" + doneDate
                + ", priority=" + priority
                + ", creationDate=" + creationDate
                + '}'
                + "FIN";
    }

}
