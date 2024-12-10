/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.service;

import com.example.server.model.PaginatedResponse;
import com.example.server.model.Todo;
import com.example.server.model.TodoFilter;
import java.util.Optional;

/**
 *
 * @author luis.renteria
 */
public interface TodoServiceInterface {

    
    Todo createTodo(Todo todo);

    Optional<Todo> getTodoById(Long id);

    PaginatedResponse<Todo> getAllTodo(TodoFilter filter);

    Optional<Todo> updateTodo(Long id, Todo todo);

    Optional<Todo> deleteTodoById(Long id);

    Optional<Todo> updateTodoStatus(Long id, boolean done);


}
