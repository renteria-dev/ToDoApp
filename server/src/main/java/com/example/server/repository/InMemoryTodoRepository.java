/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.repository;

import com.example.server.model.Metric;
import com.example.server.model.Todo;
import com.example.server.model.TodoFilter;
import java.time.Instant;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
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
        todo.setCreationDate(Instant.now());
        db.put(todo.getId(), todo);
        return todo;
    }

    @Override
    public Optional<Todo> update(Todo todo) {
        if (db.containsKey(todo.getId())) {
            db.put(todo.getId(), todo);
            return Optional.of(todo);
        }
        return Optional.empty();
    }

    @Override
    public Optional<Todo> findById(Long id) {
        return Optional.ofNullable(db.get(id));
    }

    @Override
    public List<Todo> findAll(TodoFilter myFilter, int pageSize) {
        return db.values().stream()
                .filter(todo -> filterByPriority(todo, myFilter))
                .filter(todo -> filterByState(todo, myFilter))
                .filter(todo -> filterBySearch(todo, myFilter))
                .sorted(Comparator.comparing(Todo::getCreationDate))
                .skip(calculateSkip(myFilter.getPage(), pageSize))
                .limit(pageSize)
                .collect(Collectors.toList());
    }

    @Override
    public long count(TodoFilter myFilter) {
        return db.values().stream()
                .filter(todo -> filterByPriority(todo, myFilter))
                .filter(todo -> filterByState(todo, myFilter))
                .filter(todo -> filterBySearch(todo, myFilter))
                .count();
    }

    // Auxiliar filters
    private boolean filterByPriority(Todo todo, TodoFilter filter) {
        String priority = filter.getPriority();

        if (priority == null) {
            return true;
        }
        if ("ALL".equals(priority)) {
            return true;
        }
        return todo.getPriority().equals(filter.getPriority());
    }

    private boolean filterByState(Todo todo, TodoFilter filter) {
        String state = filter.getState();
        if (state == null) {
            return true;
        }
        if ("DONE".equals(state)) {
            return todo.isDone();
        }
        if ("UNDONE".equals(state)) {
            return !todo.isDone();
        }
        return true;
    }

    private boolean filterBySearch(Todo todo, TodoFilter filter) {
        String search = filter.getSearch();
        return search == null || todo.getText().toLowerCase().contains(search.toLowerCase());
    }

    // Auxiliar Method to calculate skip
    private long calculateSkip(int page, int pageSize) {
        return (long) (Math.max(page - 1, 0)) * pageSize;
    }

    @Override
    public void deleteById(Long id) {
        db.remove(id);
    }

    @Override
    public Metric getMetrics() {

        Metric m = new Metric();

        m.setAverageLow(db.values().stream()
                .filter(obj -> obj.isDone() == true && obj.getPriority().equals("LOW"))
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

        return m;
    }
}
