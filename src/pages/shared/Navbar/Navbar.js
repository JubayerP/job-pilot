import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';
import { useChangeBg } from '../../../hooks/useChangeNavbg';
import useNavbg from '../../../hooks/useNavbg';
import NavMenu from './NavMenu';

const drawerWidth = 240;
const navItems = [
  {
    name: 'Dashboard',
    link: '/dashboard/listjob'
  }
];

const Navbar = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { user } = React.useContext(AuthContext);

  const [active] = useNavbg();
  const [color] = useChangeBg();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Job Pilot
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <Link to='/dashboard'>{item.name}</Link>
            </ListItemButton>
          </ListItem>
        ))}
        <Button variant="contained">Register</Button>
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px' }}>
      <CssBaseline />
      <AppBar component="nav"
        sx={{
          background: active ? 'black' : `${color}`,
          // background: 'transparent',
          boxShadow: 'none',
          height: '80px',
          // zIndex: 2,
          borderBottom: '1px solid #ddd'
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'none', md: 'block' }, }}
          >
            <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
              Job Pilot
            </Link>
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{
                color: '#fff', mr: 2,
                textTransform: 'capitalize',
                "&:hover": {
                  color: '#03A84E'
                }

              }} disableRipple variant='text'>
                <Link to={item.link}>
                  {item.name}
                </Link>
              </Button>
            ))}
            {user?.uid ? <NavMenu />
              :
              <Link to='/register' style={{ textDecoration: 'none' }}>

                <Button
                  disableRipple
                  variant="contained"
                  sx={{
                    bgcolor: '#03A84E',
                    '&:hover': {
                      bgcolor: '#03A84E',
                      boxShadow: 'none'
                    },
                    boxShadow: 'none',
                    px: 3,
                    py: '.8rem'
                  }}
                ><AddIcon sx={{ fontSize: '20px' }} /> Register</Button>
              </Link>
            }
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

export default Navbar;
