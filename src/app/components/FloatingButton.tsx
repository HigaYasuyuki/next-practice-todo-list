import React from 'react';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface FloatingButtonProps {
  onClick: () => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onClick }) => {
  return (
    <Fab color="secondary" aria-label="add" onClick={onClick}>
      <AddIcon />
    </Fab>
  );
};

export default FloatingButton;
