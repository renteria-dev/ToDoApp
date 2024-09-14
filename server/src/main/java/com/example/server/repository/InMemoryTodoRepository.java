/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.repository;

import com.example.server.model.Metric;
import com.example.server.model.Pages;
import com.example.server.model.Todo;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;
import org.springframework.stereotype.Repository;

/**
 *
 * @author luis.renteria
 */
@Repository
public class InMemoryTodoRepository implements TodoRepositoryInterface {

    private final Map<Long, Todo> db = new HashMap<>();
    private final AtomicLong idGen = new AtomicLong();

    @Override
    public Todo create(Todo todo) {

        todo.setId(idGen.incrementAndGet());

        db.put(todo.getId(), todo);
        return todo;

    }

    @Override
    public Optional<Todo> update(Todo todo) {
        Optional<Todo> older = findById(todo.getId());
        if (older.isPresent()) {
            older.get().setText(todo.getText());
            older.get().setPriority(todo.getPriority());
            older.get().setDueDate(todo.getDueDate());

            return older;
        }
        return null;

    }

    @Override
    public Optional<Todo> findById(Long id) {

        return Optional.ofNullable(db.get(id));
    }

    @Override
    public HashMap<String, Object> findAll(int page, String priority, String state) {
        ArrayList todos;
        if ("ALL".equals(priority) && "ALL".equals(state)) {

            todos = new ArrayList<>(db.values());
        } else {

            todos = new ArrayList<>(db.values().stream()
                    .filter(obj
                            -> "ALL".equals(priority)
                    || obj.getPriority().equals(priority))
                    .filter(obj
                            -> "ALL".equals(state)
                    || (("DONE".equals(state)
                    && obj.getDoneDate() != null))
                    || (("UNDONE".equals(state)
                    && obj.getDoneDate() == null)))
                    .collect(Collectors.toList()));
        }
        int limit = 10;

        int numPages = todos.size() / limit;

        if (numPages * limit < todos.size() || numPages == 0) {
            numPages = numPages + 1;
        }

        if (page <= 0) {
            page = 1;
        }
        if (page > numPages) {
            page = numPages;
        }

        int start = (page - 1) * limit;
        int end = Math.min((start + limit), todos.size());
        System.out.println("s+limit:" + (start + limit));
        System.out.println("size:" + todos.size());

        HashMap<String, Object> response = new HashMap<>();
        response.put("todos", todos.subList(start, end));
        response.put("pages", new Pages(numPages, page));
        response.put("metrics", new Metric());

        return response;

    }

    @Override
    public Todo deleteById(Long id) {
        Todo removed = db.remove(id);
        return removed;
    }

    @Override
    public Todo setDone(Long id) {
        Todo todo = db.get(id);
        if (todo != null && todo.isDone() == false) {
            todo.setDone(true);
        }
        return todo;
    }

    @Override
    public Todo setUnDone(Long id) {
        db.get(id).setDone(false);
        return db.get(id);
    }

}
