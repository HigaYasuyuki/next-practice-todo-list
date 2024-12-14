import React from 'react';
import { Box, Typography } from '@mui/material';

interface SelectedItemDescriptionProps {
  item: {
    title: string;
    description: string|null;
    completed: boolean;
  } | null;
}

const SelectedItemDescription: React.FC<SelectedItemDescriptionProps> = ({ item }) => {
  if (!item) {
    return null;
  }

  return (
    <Box padding={2} borderTop="1px solid #ccc">
      <Typography>{item.description}</Typography>
    </Box>
  );
};

export default SelectedItemDescription;
