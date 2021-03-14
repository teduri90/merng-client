import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import InputBase from '@material-ui/core/InputBase';

import { contextProp } from '../context/ContextProp';
import { AuthContext } from '../context/auth';
import { StepLabel } from '@material-ui/core';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    "& .Mui-selected": {
      backgroundColor: "#3f51b5",
      color: "white"
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    opacity: '0.8',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    zIndex: '100',
    opacity: '0.95',
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
    opacity: '0.95',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: '1px',
  },
}));

export default function SideBar() {
  

  // 클릭 시 SelectCategory 에 추가
  // 클릭 시 SelectCategory 에서 제외 => 기존 제외 건들은 유지 필요

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const {categorySelect, setCategorySelect, userSelect, setUserSelect, loading, error, getUsers, setZoomLevel , setPlaceName, placeName } = useContext(contextProp);
  const context = useContext(AuthContext)

  const categorySelector = (categoryselected) => {
    if(categorySelect.find(list => list === categoryselected)){
      setCategorySelect(categorySelect.filter(e => e !== categoryselected))
    } else {
      setCategorySelect(categorySelect.concat(categoryselected));
      console.log(categorySelect);
    };
  };

  const handleDrawerOpen = () => {
    setOpen(true);
    console.log(placeName);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const customHandler = (e) => {
    setValue(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setPlaceName(value);
    setValue("");

  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            RECOMMENED
          </Typography>
            <MenuItem component={Link} to="/" onClick={() => setZoomLevel("8")}>
                HOME
            </MenuItem>
          
            <MenuItem component={Link} to="/feedback">
                FEEDBACK
            </MenuItem>
            <div style={{flexGrow:"1"}}>

            </div>
            <form onSubmit={onSubmitHandler}>
              <InputBase
                value={value}
                placeholder=" Search ... "
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={customHandler}
                style={{backgroundColor:"white", borderRadius:"10px", color:"blue", fontSize:"14px"}}
              />
            </form>
            {/*SEARCH: <input value={placeName} onChange={customHandler} />*/}
              
              {context.user ? "" : <MenuItem component={Link} to="/login">
                  LOGIN
              </MenuItem>}
              
              {context.user && <MenuItem onClick={context.logout}>
                  LOGOUT
              </MenuItem>}
              {context.user ? "" :<MenuItem component={Link} to="/register">
                  REGISTER
              </MenuItem>}
            <Menu>
              
              <MenuItem>
                  MyPage
              </MenuItem>
              <MenuItem>
                  Logout
              </MenuItem>
              QDW
            </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem className="newClassName" button key="restaurant" onClick={() => categorySelector("restaurant")} selected={categorySelect.find(e => e === "restaurant") ? true : false}>
              <ListItemIcon><RestaurantIcon></RestaurantIcon></ListItemIcon>
              <ListItemText>Restaurant</ListItemText>
          </ListItem>
          <Divider />
          <ListItem button key="cafe" onClick={() => categorySelector("cafe")} selected={categorySelect.find(e => e === "cafe") ? true : false}>
            <ListItemIcon><LocalCafeIcon></LocalCafeIcon></ListItemIcon>
            <ListItemText>Cafe</ListItemText>
          </ListItem>
          <Divider />
          
          <ListItem button key="photo" onClick={() => categorySelector("photo")} selected={categorySelect.find(e => e === "photo") ? true : false} >
            <ListItemIcon><PhotoCameraIcon></PhotoCameraIcon></ListItemIcon>
            <ListItemText>Photo</ListItemText>
          </ListItem>
          <Divider />
          
          <ListItem button key="travel" onClick={() => categorySelector("travel")} selected={categorySelect.find(e => e === "travel") ? true : false}>
            <ListItemIcon><CardTravelIcon></CardTravelIcon></ListItemIcon>
            <ListItemText>Travel</ListItemText>
          </ListItem>
          <Divider />
        </List>
      </Drawer>
    </div>
    
  );
}

/*
  
      <Box display="flex" overflow="auto">
             
            
      {loading ? "loading" : error ? "error" : 
          getMarkers.map(e=> 
            <Card>
            <CardActionArea>
              <CardMedia
                image="/static/images/cards/contemplative-reptile.jpg"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {e.body}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
              <Button size="small" color="primary">
                Learn More
              </Button>
            </CardActions>
          </Card>
          )}    
              

      </Box>
*/