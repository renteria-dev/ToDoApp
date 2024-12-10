/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.repository;

import com.example.server.model.Todo;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

/**
 *
 * @author luis.renteria
 */
public class InMemoryTodoRepositoryTest {

    private InMemoryTodoRepository todoRepository;
    private Todo todo;

    @BeforeEach
    void setUp() {
        todoRepository = new InMemoryTodoRepository();
        todo = new Todo(1L, "Test Todo", "HIGH");
        todoRepository.create(todo);
    }

    @Test
    void testFindById() {
        Todo foundTodo = todoRepository.findById(1L).orElse(null);

        assertNotNull(foundTodo);
        assertEquals(todo.getText(), foundTodo.getText());
    }

    @Test
    void testDeleteById() {
        todoRepository.deleteById(1L);
        Todo deletedTodo = todoRepository.findById(1L).orElse(null);

        assertNull(deletedTodo);
    }
}
