/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.repository;

import com.example.server.model.Metric;
import com.example.server.model.Pages;
import com.example.server.model.Todo;
import java.sql.DriverManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;
import java.util.stream.Stream;
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
        todo.setCreationDate(Instant.now());

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
    public HashMap<String, Object> findAll(int page, String priority, String state, String search) {
        ArrayList<Todo> todos;
        Stream<Todo> filteredStream = db.values().stream();

        if (!"ALL".equals(priority)) {
            filteredStream = filteredStream.filter(obj -> obj.getPriority().equals(priority));
        }

        if ("DONE".equals(state)) {
            filteredStream = filteredStream.filter(obj -> obj.getDoneDate() != null);
        } else if ("UNDONE".equals(state)) {
            filteredStream = filteredStream.filter(obj -> obj.getDoneDate() == null);
        }

        if (!"".equals(search)) {
            filteredStream = filteredStream.filter(obj -> obj.getText().contains(search));
        }

        todos = new ArrayList(filteredStream.collect(Collectors.toList()));

        
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
        

        HashMap<String, Object> response = new HashMap<>();
        response.put("todos", todos.subList(start, end));
        response.put("pages", new Pages(numPages, page));

        Metric m = new Metric();

        m.setAverageLow(db.values().stream()
                .filter(obj-> obj.isDone() == true && obj.getPriority().equals("LOW"))
                .mapToLong(obj -> obj.getDoneDate().getEpochSecond()
                        - obj.getCreationDate().getEpochSecond())
                .average().orElse(Double.NaN));
        
        m.setAverageMedium(db.values().stream()
                .filter(obj -> obj.isDone() == true && obj.getPriority().equals("MEDIUM"))
                .mapToLong(obj -> obj.getDoneDate().getEpochSecond() 
                        - obj.getCreationDate().getEpochSecond())
                .average().orElse(Double.NaN));
        
        m.setAverageHigh(db.values().stream()
                .filter(obj -> obj.isDone() == true && obj.getPriority().equals("HIGH"))
                .mapToLong(obj -> obj.getDoneDate().getEpochSecond() 
                        - obj.getCreationDate().getEpochSecond())
                .average().orElse(Double.NaN));
        
        m.setAverage(db.values().stream()
                .filter(obj -> obj.isDone())
                .mapToLong(obj -> obj.getDoneDate().getEpochSecond() 
                        - obj.getCreationDate().getEpochSecond())
                .average().orElse(Double.NaN));

        
        response.put("metrics", m);

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
