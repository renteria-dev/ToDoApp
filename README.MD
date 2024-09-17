# Breackable Toy I: TODO APP

## Overview

**ToDo App**: The goal of this aplicaion is to manage tasks. It supports due dates and 3 levels of priority (Low, Medium and High). Also, it supports pagination, search, sorting, filtering and metrics tracking.

## Frontend

- React + TypeScript

## Backend (REST API)

- Java
- Spring Boot
- Maven

## Main Features

- Basic CRUD operations.
- Mark a task as done or undone
- Pagination (10 elements per page).
- Filter by priority and/or task status.
- Sort by priority and/or due date.
- Metrics that shows average time of completion time (by priority and globally).

## Setup

Before you run this proyect, you must have installed node.js, java 21 and maven.

### 1. Clone this repository

```bash
git clone https://github.com/renteria-dev/ToDoApp.git
```
```bash
cd ToDoApp
```

### 2. Backend Setup

Navigate to ./server, build and run proyect with these commands:

```bash
 cd server
```

```bash
 mvn clean install
```

```bash
 mvn spring-boot:run
```

App will run on port 9090.

### 3. Frontend Setup

Navigate to ./client, build and run proyect with these commands:

```bash
cd client
```

- Install dependencies
  ```bash
   npm install
  ```
- Run proyect
  ```bash
   npm run start
  ```

By default, Frontend runs on port 8080. You need to open a web browser and go to `http://localhost:8080`


### Adittional Notes

[Springboot plugin for Netbeans IDE](https://github.com/AlexFalappa/nb-springboot) was used to create the proyect.