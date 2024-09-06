/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import java.time.Instant;

/**
 *
 * @author luis.renteria
 */
public class Metric {

    private Instant average;
    private Instant averageHigh;
    private Instant averageMedium;
    private Instant averageLow;
    @JsonCreator

    public Metric() {
        this.average= Instant.now();
        this.averageHigh=Instant.now();
        this.averageMedium=Instant.now();
        this.averageLow=Instant.now();       
        /*
        this.average = new Instant(new LocalDate(2000,0,0));
        this.average = times;*/
        
        
    
    
    }

    public Instant getAverage() {
        return average;
    }

    public void setAverage(Instant average) {
        this.average = average;
    }

    public Instant getAverageHigh() {
        return averageHigh;
    }

    public void setAverageHigh(Instant averageHigh) {
        this.averageHigh = averageHigh;
    }

    public Instant getAverageMedium() {
        return averageMedium;
    }

    public void setAverageMedium(Instant averageMedium) {
        this.averageMedium = averageMedium;
    }

    public Instant getAverageLow() {
        return averageLow;
    }

    public void setAverageLow(Instant averageLow) {
        this.averageLow = averageLow;
    }

}
