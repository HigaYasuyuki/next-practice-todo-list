import React from 'react';
import TodoItem from './TodoItem';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const fetchTodos = async () => {
  const todos = await prisma.todo.findMany();
  return todos;
};

const TodoList = async () => {
  const todos = await fetchTodos();

  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          title={todo.title}
          description={todo.description}
          completed={todo.completed}
        />
      ))}
    </div>
  );
};

export default TodoList;
