/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.model;

import lombok.Getter;
import lombok.Setter;

/**
 *
 * @author luis.renteria
 */
@Getter
@Setter
public class TodoFilter {

    private int page;
    private String priority;
    private String state;
    private String search;

    public TodoFilter(int page, String priority, String state, String search) {
        this.page = page;
        this.priority = priority;
        this.state = state;
        this.search = search;

    }

}
