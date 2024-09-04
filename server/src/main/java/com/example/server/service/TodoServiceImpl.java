/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.service;

import com.example.server.model.Todo;
import com.example.server.repository.TodoRepositoryInterface;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

/**
 *
 * @author luis.renteria
 */
@Service
public class TodoServiceImpl implements TodoServiceInterface {
    
    private final TodoRepositoryInterface todoRepository;
    
    public TodoServiceImpl(TodoRepositoryInterface todoRepositoryInterface) {
        this.todoRepository = todoRepositoryInterface;
    }
    
    @Override
    public Todo createTodo(Todo todo) {
        System.out.println(todo);
        return todoRepository.save(todo);
    }
    
    @Override
    public Optional<Todo> getTodoById(Long id) {
        return todoRepository.findById(id);
    }
    
    @Override
    public List<Todo> getAllTodo() {
        return todoRepository.findAll();
    }
    
    @Override
    public Todo updateTodo(Long id, Todo todo) {
        Optional<Todo> oldTodo = todoRepository.findById(id);
        if (oldTodo.isPresent()) {
            todo.setId(id);
            return todoRepository.save(todo);
        }
        return null;
        
    }
    
    @Override
    public Todo deleteTodoById(Long id) {
        return todoRepository.deleteById(id);
    }
    
    @Override
    public Todo setDone(Long id) {
        return todoRepository.setDone(id);
    }
    
    @Override
    public Todo setUnDone(Long id) {
        return todoRepository.setUnDone(id);
    }
    
}
