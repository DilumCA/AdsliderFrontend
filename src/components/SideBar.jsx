import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, Divider, Typography } from '@mui/material';

function Sidebar() {
  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#1c2530', // Matches dark navbar
          color: '#ffffff',
          paddingTop: 3,
        },
      }}
      variant="permanent"
      anchor="left"
    >
      {/* Logo Section */}
      <div className="flex justify-center mb-4">
        <img
          src={'./src/assets/logo.png'}
          alt="SLT Logo"
          style={{ width: 140, height: 'auto', marginTop: '10px' }}
        />
      </div>

      <Divider sx={{ backgroundColor: '#2e3b4a', marginBottom: 1 }} />

      <List>
        {[
          { text: 'Dashboard', to: '/dashboard' },
          { text: 'Ad Management', to: '/admanage' },
          { text: 'Profile', to: '/profile' },
          { text: 'Settings', to: '/settings' },
          { text: 'Users', to: '/users' },
          { text: 'Reports', to: '/reports' },
        ].map((item, index) => (
          <ListItem
            key={index}
            button
            component={Link}
            to={item.to}
            sx={{
              '&:hover': {
                backgroundColor: '#2e3b4a',
              },
              paddingY: 1,
              paddingX: 3,
            }}
          >
            <ListItemText
              primary={
                <Typography sx={{ fontWeight: 500, fontSize: '15px' }}>
                  {item.text}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;
