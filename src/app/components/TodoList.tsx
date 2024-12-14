'use client';

import React, { useState } from 'react';
import TodoItem from './TodoItem';
import SelectedItemDescription from './SelectedItemDescription';
import { List } from '@mui/material';

interface Todo {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  const [selectedItem, setSelectedItem] = useState<Todo | null>(null);

  const handleSelect = (item: Todo) => {
    setSelectedItem(item);
  };

  return (
    <List>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          title={todo.title}
          description={todo.description}
          completed={todo.completed}
          onSelect={() => handleSelect(todo)}
        />
      ))}
      <SelectedItemDescription item={selectedItem} />
    </List>
  );
};

export default TodoList;
