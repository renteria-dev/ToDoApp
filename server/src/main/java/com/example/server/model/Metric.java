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
public class Metric {

    private double average;
    private double averageHigh;
    private double averageMedium;
    private double averageLow;

    @JsonCreator
    public Metric() {

    }

    @Override
    public String toString() {
        return "Todo{"
                + "av='" + average + '\''
                + ", low='" + averageLow + '\''
                + ", med=" + averageMedium
                + ", high=" + averageHigh
                + '}';
    }

}
