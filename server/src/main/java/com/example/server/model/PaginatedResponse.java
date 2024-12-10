/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.model;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

/**
 *
 * @author luis.renteria
 */
@Getter
@Setter
public class PaginatedResponse<T> {

    public static int PAGE_SIZE = 10;

    private List<T> content;
    private Pages pages;
    private Metric metrics;
    private long totalItems;

    public PaginatedResponse() {
    }

}
