/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Getter;
import lombok.Setter;

/**
 *
 * @author luis.renteria
 */
@Getter
@Setter
public class Pages {

    private int totalPages;
    private int actualPage;

    @JsonCreator
    public Pages(int totalPages, int actualPage) {
        this.totalPages = totalPages;
        this.actualPage = actualPage;
    }

}
