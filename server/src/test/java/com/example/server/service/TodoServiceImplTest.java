/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.service;

import com.example.server.model.Todo;
import com.example.server.repository.TodoRepositoryInterface;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;

/**
 *
 * @author luis.renteria
 */
@ExtendWith(MockitoExtension.class)
public class TodoServiceImplTest {

    @Mock
    private TodoRepositoryInterface todoRepository;

    @InjectMocks
    private TodoServiceImpl todoService;

    private Todo todo;

    @BeforeEach
    void setUp() {
        todo = new Todo(1L, "Test Todo", "HIGH");
    }

    @Test
    void testCreateTodo() {
        when(todoRepository.create(todo)).thenReturn(todo);

        Todo createdTodo = todoService.createTodo(todo);

        assertNotNull(createdTodo);
        assertEquals("Test Todo", createdTodo.getText());
    }

    @Test
    void testUpdateTodoStatus() {
        when(todoRepository.findById(1L)).thenReturn(Optional.of(todo));
        when(todoRepository.update(todo)).thenReturn(Optional.of(todo));

        Optional<Todo> updatedTodo = todoService.updateTodoStatus(1L, true);

        assertTrue(updatedTodo.isPresent());
        assertTrue(updatedTodo.get().isDone());
    }
}
