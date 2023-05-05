import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/app/hooks';
import { auth, saveRole, saveUsername } from '../redux/user/userSlice';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loginApiService, logoutApiService } from '../api/AuthenticationApiService';

import {       
  Button
} from "@mui/material";


import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Avatar from "@mui/material/Avatar";
import NotificationsIcon from "@mui/icons-material/Notifications";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;

export default function DrawerAppBar(props: Props) {
  const { window } = props;
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [user, setUser] = React.useState<any>(localStorage.getItem('user-details'));
  const [userrole, setUserRole] = React.useState<any>(localStorage.getItem('user-role'));
  const navigate = useNavigate();


  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {/* {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))} */}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  const isAutherised = useAppSelector((state) => state.user.auth);
  const role = useAppSelector((state) => state.user.role);
  const dispatch = useAppDispatch();

  React.useEffect(() =>{
    setUser(isAutherised);
  }, [user, userrole]);

  const logout = async () =>{
    const response = await logoutApiService();
    if(response.status == 200){
      localStorage.clear();
      dispatch(auth(false));
      dispatch(saveRole(null));
      setUser(null);
      navigate('/logout');
    }
  }

  console.log(isAutherised)

  return (
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      <AppBar component="nav" sx={{ background:"#FFFFFF",  }}>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h5"
            component="div"
            sx={{display: { xs: 'none', sm: 'block' }, marginRight: '80px', marginLeft:'120px',color:'#0886CA' }}
          >
            <a href="/" className='tracking-widest font-bold text-3xl font-mono'>
              <span className='text-cyan-700'>I</span> 
              <span className='text-cyan-300'>-</span>
              <span className='text-stone-700'>Tracker</span></a>
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block', fontSize:'18px', fontWeight: '800'},flexGrow: 1 }}>
                <Link to={`/welcome`} className='tracking-widest mr-10 text-stone-500'>Home</Link>
                <Link to="/all-issues" className='tracking-widest hover:text-purple text-stone-500'>Issues</Link>
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'block', fontSize:'16px', fontWeight: '800'}, mr:'20px'  }}>
                {isAutherised===false || isAutherised === null ? <Box className='bg-cyan-700' sx={{px:'50px',py:'8px', color:'white', borderRadius:'5px' }}>
                    <Link to="/login" className='tracking-widest hover:text-black' 
                    style={{textDecoration:"none"}}>LOGIN</Link>
                </Box> : 
                    <div className="home-icon">
                                 <NotificationsIcon
                                   className="learner-icon bg-cyan-700"
                                   style={{
                                     color: "white",
                                     padding: "5px",
                                     fontSize: "50px",
                                     borderRadius: "30%",
                                     margin: "10px",
                                   }}
                                 />
                                 <PersonIcon
                                   className="learner-icon bg-cyan-700"
                                   style={{
                                     color: "white",
                                     padding: "5px",
                                     fontSize: "50px",
                                     borderRadius: "30%",
                                     margin: "10px",
                                   }}
                                   onClick={handleClick}
                                 />
                                 <Menu
                                   anchorEl={anchorEl}
                                   id="account-menu"
                                   open={open}
                                   onClose={handleClose}
                                   onClick={handleClose}
                                   PaperProps={{
                                     elevation: 0,
                                     sx: {
                                       overflow: "visible",
                                       filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                       mt: 1.5,
                                       "& .MuiAvatar-root": {
                                         width: 32,
                                         height: 32,
                                         ml: -0.5,
                                         mr: 1,
                                         //   bgcolor: 'background.paper',
                                       },
                                       "&:before": {
                                         content: '""',
                                         display: "block",
                                         position: "absolute",
                                         top: 0,
                                         right: 14,
                                         width: 10,
                                         height: 10,
                                         //   bgcolor: 'background.paper',
                                         transform: "translateY(-50%) rotate(45deg)",
                                         zIndex: 0,
                                       },
                                     },
                                   }}
                                   transformOrigin={{ horizontal: "right", vertical: "top" }}
                                   anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                                 >
                                   <MenuItem>
                                    <Avatar /> Profile
                                   </MenuItem>
                                   <Divider />
                                   <MenuItem>
                                     <Link to="/issues">
                                       <ListItemIcon>
                                         <GroupIcon fontSize="small" />
                                       </ListItemIcon>
                                        My Issues
                                     </Link>
                                   </MenuItem>
                                   {role === 'EXPERT' && <MenuItem>
                                     <Link to="/assigned-issues">
                                       <ListItemIcon>
                                         <GroupIcon fontSize="small" />
                                       </ListItemIcon>
                                        Assigned
                                     </Link>
                                   </MenuItem>}
                                   <MenuItem onClick={logout}>
                                     <ListItemIcon>
                                       <Logout fontSize="small" />
                                     </ListItemIcon>
                                     Logout
                                   </MenuItem>
                                 </Menu>
                               </div>}
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
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 1 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}