/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.service;

import com.example.server.model.Todo;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

/**
 *
 * @author luis.renteria
 */
public interface TodoServiceInterface {

    Todo createTodo(Todo todo);

    Optional<Todo> getTodoById(Long id);

    HashMap<String,Object> getAllTodo(int page,String priority, String state);

    Optional<Todo> updateTodo(Long id, Todo todo);

    Todo deleteTodoById(Long id);
    
    Todo setDone(Long id);

    Todo setUnDone(Long id);

}
