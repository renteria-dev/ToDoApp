/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.controller;

import com.example.server.model.Metric;
import com.example.server.model.Todo;
import com.example.server.service.TodoServiceInterface;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 *
 * @author luis.renteria
 */
// This anotations tells Spring to handle HTTP requests and return JSON data
@RestController
@RequestMapping("/api/v1")

public class TodoController {

    @Autowired
    private final TodoServiceInterface todoService;

    public TodoController(TodoServiceInterface todoService) {
        this.todoService = todoService;
    }

    @GetMapping
    public String getStatus() {
        return "Server is running";
    }

    @GetMapping("/todos")
    public HashMap<String, Object> getPage(@RequestParam int page) {
        HashMap<String, Object> response = todoService.getAllTodo(page);
        
        return response;
    }

    @GetMapping("/todos/{id}")
    public Optional<Todo> getTodoById(@PathVariable Long id) {
        return todoService.getTodoById(id);
    }

    @PostMapping("/todos")
    public Todo createTodo(@RequestBody Todo todo) {
        System.out.println(todo);
        return todoService.createTodo(todo);
    }

    @PutMapping("/todos/{id}")
    public Todo updateTodo(@PathVariable Long id, @RequestBody Todo todo) {
        return todoService.updateTodo(id, todo);
    }

    @PostMapping("/todos/{id}/done")
    public Todo updateTodoDone(@PathVariable Long id) {

        return todoService.setDone(id);

    }

    @PutMapping("/todos/{id}/undone")
    public Todo updateTodoUnDone(@PathVariable Long id) {

        return todoService.setUnDone(id);

    }

    @DeleteMapping("/todos/{id}")
    public Todo deleteTodoById(@PathVariable Integer id) {
        return todoService.deleteTodoById(Long.valueOf(id));
    }

}
