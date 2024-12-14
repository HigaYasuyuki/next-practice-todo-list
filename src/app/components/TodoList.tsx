'use client';

import React, { useState } from 'react';
import TodoItem from './TodoItem';
import SelectedItemDescription from './SelectedItemDescription';
import { List, TextField, Button } from '@mui/material';
import FloatingButton from './FloatingButton';

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
  const [displayedTodos, setDisplayedTodos] = useState(todos);
  const [selectedItem, setSelectedItem] = useState<Todo | null>(null);
  const [showInput, setShowInput] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const handleSelect = (item: Todo) => {
    if (showInput) {
      return;
    }
    setSelectedItem(item);
  };

  const handleAddButtonClick = () => {
    setShowInput(true);
    setSelectedItem(null);
  };

  const handleAddTodo = async () => {
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: newTitle, description: newDescription }),
    });

    if (response.ok) {
      const newTodo = await response.json();
      setDisplayedTodos([...displayedTodos, newTodo]);
      setShowInput(false);
      setNewTitle('');
      setNewDescription('');
    }
  };

  const handleCancel = () => {
    setShowInput(false);
    setNewTitle('');
    setNewDescription('');
  };

  const handleDeleteTodo = async (id: number) => {
    const response = await fetch(`/api/todos/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      const index = displayedTodos.findIndex(todo => todo.id === id);
      if (index !== -1) {
        const newTodos = [...displayedTodos];
        newTodos.splice(index, 1);
        setDisplayedTodos(newTodos);
        setSelectedItem(null);
      }
    }
  };

  const handleToggleComplete = async (id: number) => {
    const todo = displayedTodos.find(todo => todo.id === id);
    if (todo) {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !todo.completed }),
      });

      if (response.ok) {
        setDisplayedTodos(
          (prevDisplayedTodos) =>
            prevDisplayedTodos.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
        );
      }
    }
  };

  return (
    <List>
      {displayedTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          title={todo.title}
          description={todo.description}
          completed={todo.completed}
          onSelect={() => handleSelect(todo)}
          onDelete={() => handleDeleteTodo(todo.id)}
          onToggleComplete={() => handleToggleComplete(todo.id)}
        />
      ))}
      {showInput && (
        <div style={{
          marginTop: '16px',
          marginBottom: '16px',
        }}>
          <TextField
            label="Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            sx={{
              width: '100%',
              marginBottom: '8px',
            }}
          />
          <TextField
            label="Description"
            multiline
            minRows={3}
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            sx={{
              width: '100%',
              marginBottom: '8px',
            }}
          />
          <Button color="primary" variant="contained" onClick={handleAddTodo} sx={{ marginRight: '8px' }}>Add</Button>
          <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
        </div>
      )}
      <SelectedItemDescription item={selectedItem} />
      <FloatingButton onClick={handleAddButtonClick} />
    </List>
  );
};

export default TodoList;
