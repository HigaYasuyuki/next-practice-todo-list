'use client';

import React, { useState } from 'react';
import TodoItem from './TodoItem';
import SelectedItemDescription from './SelectedItemDescription';
import { List, TextField, Button, TextareaAutosize } from '@mui/material';
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
      todos.push(newTodo);
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
