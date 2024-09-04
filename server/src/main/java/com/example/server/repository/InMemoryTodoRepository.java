/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.repository;

import com.example.server.model.Todo;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
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
    public List<Todo> findAll() {
        return new ArrayList<>(db.values());
    }

    @Override
    public Todo deleteById(Long id) {
        Todo removed = db.remove(id);
        return removed;
    }

    @Override
    public Todo setDone(Long id) {
        db.get(id).setDone(true);
        return db.get(id);
    }

    @Override
    public Todo setUnDone(Long id) {
        db.get(id).setDone(false);
        return db.get(id);
    }

}
