/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.repository;

import com.example.server.model.Metric;
import com.example.server.model.Todo;
import com.example.server.model.TodoFilter;

/**
 *
 * @author luis.renteria
 */
import java.util.List;
import java.util.Optional;

public interface TodoRepositoryInterface {

    Todo create(Todo todo);

    Optional<Todo> update(Todo todo);

    Optional<Todo> findById(Long id);

    List<Todo> findAll(TodoFilter myFilter, int pageSize);

    long count(TodoFilter filter);

    void deleteById(Long id);

    Metric getMetrics();
}
