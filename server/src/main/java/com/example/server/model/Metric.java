/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.model;

import com.fasterxml.jackson.annotation.JsonCreator;

/**
 *
 * @author luis.renteria
 */
public class Metric {
    private double average;
    private double averageHigh;
    private double averageMedium;
    private double averageLow;
  
    @JsonCreator
    public Metric()
    {
        
    }

    public double getAverage() {
        return average;
    }

    public void setAverage(double average) {
        this.average = average;
    }

    public double getAverageHigh() {
        return averageHigh;
    }

    public void setAverageHigh(double averageHigh) {
        this.averageHigh = averageHigh;
    }

    public double getAverageMedium() {
        return averageMedium;
    }

    public void setAverageMedium(double averageMedium) {
        this.averageMedium = averageMedium;
    }

    public double getAverageLow() {
        return averageLow;
    }

    public void setAverageLow(double averageLow) {
        this.averageLow = averageLow;
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
