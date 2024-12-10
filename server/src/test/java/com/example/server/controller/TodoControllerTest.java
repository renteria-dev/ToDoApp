/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.controller;

import com.example.server.model.Todo;
import com.example.server.service.TodoServiceInterface;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

/**
 *
 * @author luis.renteria
 */
@ExtendWith(MockitoExtension.class)
public class TodoControllerTest {

    @Mock
    private TodoServiceInterface todoService;

    @InjectMocks
    private TodoController todoController;

    private Todo todo;

    @BeforeEach
    void setUp() {
        todo = new Todo(1L, "Test Todo", "HIGH");
    }

    @Test
    void testUpdateTodoDone_Success() {
        when(todoService.updateTodoStatus(1L, true)).thenReturn(Optional.of(todo));

        ResponseEntity<Todo> response = todoController.updateTodoDone(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(todo, response.getBody());
    }

    @Test
    void testUpdateTodoDone_NotFound() {
        when(todoService.updateTodoStatus(1L, true)).thenReturn(Optional.empty());

        ResponseEntity<Todo> response = todoController.updateTodoDone(1L);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }
}
