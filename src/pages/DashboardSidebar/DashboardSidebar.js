import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import { useEmployer } from '../../hooks/useEmployer';
import { useJobSeeker } from '../../hooks/useJobSeeker';

export default function DashboardSidebar() {
  const { user } = React.useContext(AuthContext)

  const [isEmployer, employerLoading] = useEmployer(user?.email)
  const [isJobSeeker, jobSeekerLoading] = useJobSeeker(user?.email)

  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ [anchor]: open });
  };

  const menuItems = {
    employersMenus: [
      {
        name: 'List A Job',
        link: '/dashboard/listjob',
        icon: <LibraryAddIcon />
      }
    ],
    jobSeekerMenus: [
      {
        name: 'My Applies',
        link: '/dashboard/myapplies',
        icon: 'icon'
      }
    ]
  }


  // if (employerLoading || jobSeekerLoading) {
  //   return 'Loading.....'
  // }

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {
          isEmployer &&

          menuItems.employersMenus.map((text, index) => (
            <Link to={text.link} key={index}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {text.icon}
                  </ListItemIcon>
                  <ListItemText primary={text.name} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))
        }
        {
          isJobSeeker &&

          menuItems.jobSeekerMenus.map((text, index) => (
            <Link to={text.link} key={index}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {text.icon}
                  </ListItemIcon>
                  <ListItemText primary={text.name} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))
        }
      </List>
    </Box>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}><MenuRoundedIcon /></Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}

      <Box>
        <Outlet />
      </Box>
    </div>
  );
}