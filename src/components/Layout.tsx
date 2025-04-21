import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  IconButton,
  useTheme,
} from '@mui/material';
import {
  Home as HomeIcon,
  Calculate as CalculateIcon,
  Category as CategoryIcon,
  PhotoLibrary as GalleryIcon,
  History as HistoryIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import styled from 'styled-components';

const drawerWidth = 240;

const StyledAppBar = styled(AppBar)`
  background: linear-gradient(to right, #8B4513, #A0522D);
  border-bottom: 2px solid #654321;
`;

const StyledDrawer = styled(Drawer)`
  .MuiDrawer-paper {
    background: #F5F5DC;
    border-right: 2px solid #8B4513;
    width: ${drawerWidth}px;
  }
`;

const Logo = styled(Typography)`
  font-family: 'MedievalSharp', cursive;
  color: #F5F5DC;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const menuItems = [
  { text: 'Home', icon: <HomeIcon />, path: '/' },
  { text: 'Material Calculator', icon: <CalculateIcon />, path: '/calculator' },
  { text: 'Project Templates', icon: <CategoryIcon />, path: '/templates' },
  { text: 'Gallery', icon: <GalleryIcon />, path: '/gallery' },
  { text: 'Project History', icon: <HistoryIcon />, path: '/history' },
];

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ mt: 2 }}>
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => navigate(item.path)}
            selected={location.pathname === item.path}
            sx={{
              '&.Mui-selected': {
                backgroundColor: theme.palette.primary.light,
                '&:hover': {
                  backgroundColor: theme.palette.primary.main,
                },
              },
            }}
          >
            <ListItemIcon sx={{ color: theme.palette.primary.main }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <StyledAppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Logo variant="h6" noWrap>
            Medieval Concrete Studio
          </Logo>
        </Toolbar>
      </StyledAppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <StyledDrawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
          }}
        >
          {drawer}
        </StyledDrawer>
        <StyledDrawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
          }}
          open
        >
          {drawer}
        </StyledDrawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout; 