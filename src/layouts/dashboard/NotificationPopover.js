// NotificationPopover.js
import React from 'react';
import { Paper, List, ListItem, Typography } from '@mui/material';

const NotificationPopover = ({ notifications }) => {
  return (
    <Paper
      sx={{
        padding: 2,
        backgroundColor: (theme) => `rgb(218,208,251)`,
        backdropFilter: 'blur(10px)',
        boxShadow: (theme) => `50px 0 10px rgba(0, 0, 0, 0.2), ${theme.shadows[50]}`,
        borderRadius: '15px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxHeight: '200px',
        overflowY: 'auto',
      }}
    >
      <List>
        {notifications.map((notification) => (
          <ListItem key={notification.id}>
            <Typography variant="body2">{notification.content}</Typography>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default NotificationPopover;
