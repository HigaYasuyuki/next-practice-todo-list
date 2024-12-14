import { Typography, Checkbox, ListItem } from '@mui/material';
import React from 'react';

interface TodoItemProps {
  title: string;
  description: string|null;
  completed: boolean;
  onSelect: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ title, description, completed, onSelect }) => {
  return (
    <ListItem onClick={onSelect}>
      <Checkbox checked={completed} disabled />
      <Typography>
        {title}
      </Typography>
    </ListItem>
  );
};

export default TodoItem;
