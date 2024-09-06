package com.example.server;

import com.example.server.model.Todo;
import java.time.Instant;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ServerApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(ServerApplication.class, args);
        
        Todo myTodo = new Todo(Long.valueOf(1), "NEW", "HIGH");
        
        myTodo.setDueDate(Instant.parse("2023-03-15T14:30:00.012Z"));
        
        System.out.println(myTodo);
        
        myTodo.setDone(true);
        
        System.out.println(myTodo);
        
        myTodo.setDone(false);
        
        System.out.println(myTodo);
        
        myTodo.setText("NEWER");
        
        System.out.println(myTodo);
        
        myTodo.setText("LATEST NEWER");
        
        System.out.println(myTodo);
    }
    
}
