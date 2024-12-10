/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.service;

import com.example.server.model.Pages;
import com.example.server.model.PaginatedResponse;
import com.example.server.model.Todo;
import com.example.server.model.TodoFilter;
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

    public TodoServiceImpl(TodoRepositoryInterface todoRepository) {
        this.todoRepository = todoRepository;
    }

    @Override
    public Todo createTodo(Todo todo) {
        return todoRepository.create(todo);
    }

    @Override
    public Optional<Todo> getTodoById(Long id) {
        return todoRepository.findById(id);
    }

    @Override
    public PaginatedResponse<Todo> getAllTodo(TodoFilter filter) {
        List<Todo> todos = todoRepository.findAll(filter, PaginatedResponse.PAGE_SIZE);
        long totalItems = todoRepository.count(filter);
        int totalPages = (int) Math.ceil((double) totalItems / PaginatedResponse.PAGE_SIZE);
        if (totalPages == 0) {
            totalPages = 1;
        }

        PaginatedResponse<Todo> response = new PaginatedResponse<>();
        response.setContent(todos);
        response.setPages(new Pages(totalPages, filter.getPage()));
        response.setMetrics(todoRepository.getMetrics());
        response.setTotalItems(totalItems);

        return response;
    }

    @Override
    public Optional<Todo> updateTodo(Long id, Todo todo) {

        Optional<Todo> existingTodo = todoRepository.findById(id);

        if (existingTodo.isEmpty()) {
            return Optional.empty();
        }

        Todo updatedTodo = existingTodo.get();
        updatedTodo.setPriority(todo.getPriority());
        updatedTodo.setText(todo.getText());
        updatedTodo.setDueDate(todo.getDueDate());

        return todoRepository.update(updatedTodo);
    }

    @Override
    public Optional<Todo> deleteTodoById(Long id) {
        Optional<Todo> todo = todoRepository.findById(id);

        if (todo.isEmpty()) {
            return Optional.empty();
        }

        todoRepository.deleteById(id);
        return todo;
    }

    @Override
    public Optional<Todo> updateTodoStatus(Long id, boolean done) {
        Optional<Todo> todo = todoRepository.findById(id);

        if (todo.isEmpty()) {
            return Optional.empty();
        }

        Todo updatedTodo = todo.get();
        updatedTodo.setDone(done);

        return todoRepository.update(updatedTodo);
    }
}
