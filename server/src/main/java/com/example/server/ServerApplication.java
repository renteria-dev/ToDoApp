package com.example.server;

import com.example.server.model.Priority;
import com.example.server.model.Todo;
import java.time.LocalDate;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(ServerApplication.class, args);

        Todo myTodo = new Todo("1", "NEW", Priority.HIGH);

        myTodo.setDueDate(LocalDate.of(2025, 2, 2));

        System.out.println(myTodo);

        myTodo.setDone(true);

        System.out.println(myTodo);

        myTodo.setDone(false);

        System.out.println(myTodo);

        myTodo.setText("NEWER");

        System.out.println(myTodo);
    }

}
