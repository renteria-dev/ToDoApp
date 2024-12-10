/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.controller;

import com.example.server.model.PaginatedResponse;
import com.example.server.model.Todo;
import com.example.server.model.TodoFilter;
import com.example.server.service.TodoServiceInterface;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<String> getStatus() {
        return ResponseEntity.ok("Server is running");
    }

    @GetMapping("/todos")
    public ResponseEntity<PaginatedResponse<Todo>> getPage(
            @RequestParam("page") Optional<Integer> requestedPage,
            @RequestParam("priority") Optional<String> requestedPriority,
            @RequestParam("state") Optional<String> requestedState,
            @RequestParam("search") Optional<String> requestedSearch
    ) {
        // Set Default values in case of null
        int page = requestedPage.orElse(1);
        String priority = requestedPriority.orElse("ALL");
        String state = requestedState.orElse("ALL");
        String search = requestedSearch.orElse("");

        // Validate page to be positive
        if (page <= 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        TodoFilter filter = new TodoFilter(page, priority, state, search);
        PaginatedResponse<Todo> response = todoService.getAllTodo(filter);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/todos/{id}")
    public ResponseEntity<Todo> getTodoById(@PathVariable Long id) {
        Optional<Todo> todo = todoService.getTodoById(id);
        if (todo.isPresent()) {
            return ResponseEntity.ok(todo.get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PostMapping("/todos")
    public ResponseEntity<Object> createTodo(@RequestBody Todo todo) {
        // Validate the Todo input
        if (todo.getText() == null || todo.getText().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Title is required.");
        }

        Todo createdTodo = todoService.createTodo(todo);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTodo);
    }

    @PutMapping("/todos/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable Long id, @RequestBody Todo todo) {
        Optional<Todo> updatedTodo = todoService.updateTodo(id, todo);
        if (updatedTodo.isPresent()) {
            return ResponseEntity.ok(updatedTodo.get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PostMapping("/todos/{id}/done")
    public ResponseEntity<Todo> updateTodoDone(@PathVariable Long id) {
        Optional<Todo> updatedTodo = todoService.updateTodoStatus(id, true);

        if (updatedTodo.isPresent()) {
            return ResponseEntity.ok(updatedTodo.get()); 
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); 
        }
    }

    @PutMapping("/todos/{id}/undone")
    public ResponseEntity<Todo> updateTodoUnDone(@PathVariable Long id) {
        Optional<Todo> updatedTodo = todoService.updateTodoStatus(id, false);

        if (updatedTodo.isPresent()) {
            return ResponseEntity.ok(updatedTodo.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/todos/{id}")
    public ResponseEntity<Void> deleteTodoById(@PathVariable Long id) {
        Optional<Todo> deletedTodo = todoService.deleteTodoById(id);
        if (deletedTodo != null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/error")
    public String getError() {
        return "404 not found";
    }

}
