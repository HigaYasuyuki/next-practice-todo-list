import { Typography, Checkbox, ListItem, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';

interface TodoItemProps {
  title: string;
  description: string|null;
  completed: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onToggleComplete: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ title, description, completed, onSelect, onDelete, onToggleComplete }) => {
  return (
    <ListItem onClick={onSelect} style={{ textDecoration: completed ? 'line-through' : 'none', opacity: completed ? 0.5 : 1 }}>
      <Checkbox checked={completed} onChange={onToggleComplete} />
      <Typography>
        {title}
      </Typography>
      <IconButton edge="end" aria-label="delete" onClick={onDelete}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};

export default TodoItem;
