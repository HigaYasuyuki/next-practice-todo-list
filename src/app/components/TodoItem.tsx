import { Typography } from '@mui/material';
import React from 'react';

interface TodoItemProps {
  title: string;
  description: string|null;
  completed: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ title, description, completed }) => {
  return (
    <div>
      <Typography>
        {title}
      </Typography>
      <Typography>{description}</Typography>
      <Typography>{completed ? 'Completed' : 'Not Completed'}</Typography>
    </div>
  );
};

export default TodoItem;
