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
    public Todo save(Todo todo) {
        if (todo.getId() == null) {
            todo.setId(idGen.incrementAndGet());
        }
        db.put(todo.getId(), todo);
        return todo;

    }

    @Override
    public Optional<Todo> findById(Long id) {

        return Optional.ofNullable(db.get(id));
    }

    @Override
    public HashMap<String, Object> findAll(int page) {
        ArrayList todos = new ArrayList<>(db.values());
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
        if(todo!=null && todo.isDone()==false){todo.setDone(true);}
        return todo;
    }

    @Override
    public Todo setUnDone(Long id) {
        db.get(id).setDone(false);
        return db.get(id);
    }

}
