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
          paddingTop: 0, // Padding will now be controlled via Tailwind
          backgroundColor: 'transparent', // Tailwind will handle the bg
        },
      }}
      variant="permanent"
      anchor="left"
    >
      {/* Sidebar Container */}
      <div className="w-[240px] bg-[#1c2530] text-white pt-3 h-full">
        {/* Logo Section */}
        <div className="flex justify-center mb-4">
          <img
            src={'./src/assets/logo.png'}
            alt="SLT Logo"
            className="w-[140px] mt-[10px]"
          />
        </div>

        <Divider className="!bg-[#2e3b4a] mb-1" />

        {/* Navigation List */}
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
              className="py-2 px-6 hover:bg-[#2e3b4a]"
            >
              <ListItemText
                primary={
                  <Typography className="font-medium text-[15px]">
                    {item.text}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
}

export default Sidebar;
