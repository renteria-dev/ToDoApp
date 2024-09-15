/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.controller;

import com.example.server.model.Todo;
import com.example.server.service.TodoServiceInterface;
import java.util.HashMap;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 *
 * @author luis.renteria
 */
// This anotations tells Spring to handle HTTP requests and return JSON data
@RestController
@CrossOrigin(origins = "http://localhost:8080")
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
    public HashMap<String, Object> getPage(
            @RequestParam("page") Optional<Integer> requestedPage,
            @RequestParam("priority") Optional<String> requestedPriority,
            @RequestParam("state") Optional<String> requestedState,
            @RequestParam("search") Optional<String> requestedSearch
    ) {
        int page = (int) requestedPage.orElse(1);
        String priority = (String) requestedPriority.orElse("ALL");
        String state = (String) requestedState.orElse("ALL");
        String search = (String) requestedSearch.orElse("");
        HashMap<String, Object> response = todoService.getAllTodo(page,priority,state,search);

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
    public Optional<Todo> updateTodo(@PathVariable Long id, @RequestBody Todo todo) {
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

    @GetMapping("/error")
    public String getError() {
        return "404 not found";
    }

}
