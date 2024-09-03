/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 *
 * @author luis.renteria
 */
public class Todo {

    private String id;
    private String text;
    private LocalDate dueDate;
    private boolean done;
    private LocalDate doneDate;
    private Priority priority;
    private LocalDateTime creationDate;

    public Todo(String id, String text, Priority priority) {
        System.out.println(text);
        if (text == null || text.length() > 120) {
            throw new IllegalArgumentException("Text is not valid");
        }
        this.id = id;
        this.text = text;
        this.priority = priority;
        this.creationDate = LocalDateTime.now();

    }

    public Todo(String id, String text, LocalDate dueDate, Priority priority) {
        if (text == null || text.length() > 120) {
            throw new IllegalArgumentException("Text is not valid");
        }

        this.id = id;
        this.text = text;
        this.dueDate = dueDate;
        this.priority = priority;
        this.creationDate = LocalDateTime.now();

    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
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

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
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
                + '}';
    }

}
