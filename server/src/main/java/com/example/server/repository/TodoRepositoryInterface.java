/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.repository;

import com.example.server.model.Todo;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

/**
 *
 * @author luis.renteria
 */
public interface TodoRepositoryInterface {

    Todo create(Todo todo);
    
    Optional<Todo> update(Todo todo);

    Optional<Todo> findById(Long id);

    HashMap<String,Object> findAll(int page, String priority, String state,String search);

    Todo deleteById(Long id);

    Todo setDone(Long id);

    Todo setUnDone(Long id);
    
    

}
