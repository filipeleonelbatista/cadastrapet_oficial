import Box from '@mui/material/Box';
import * as React from 'react';

export default function ContainerComponent({ children, ...rest }) {
  return (
    <Box
      sx={{
        w: '100%', borderRadius: 2, p: 4, backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? "#FFF"
            : theme.palette.grey[800],
      }}
    >
      {children}
    </Box>
  )
}