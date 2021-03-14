import { Avatar, Button } from '@material-ui/core';
import React, { useContext } from 'react';
import { contextProp } from '../context/ContextProp';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { AuthContext } from '../context/auth';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  custom_button: {
    backgroundColor:"white",
    borderRadius:"20px",
      "&:hover" : {
        transform: 'scale(1.25)',
    }
  },
  custom_button_selected: {
    borderRadius:"20px",
      backgroundColor:"#3f51b5",
      "&:hover" : {
        transform: 'scale(1.25)',
      }
  },
}));

const UserBar = () => {

    const classes = useStyles();

    const {loading, error, getUsers} = useContext(contextProp);

    const {categorySelect, setCategorySelect, userSelect, setUserSelect } = useContext(contextProp);

    const userSelector = (userselected) => {
        if(userSelect.find(list => list === userselected)){
          setUserSelect(userSelect.filter(e => e !== userselected))
        } else {
          setUserSelect(userSelect.concat(userselected));
          console.log(userSelect);
        };
    };

    return (
        <div style={{display:"flex", maringLeft:"50px", marginTop:"70px", paddingTop:"10px", paddingBottom:"10px", borderRadius:"10px", backgroundColor:"#F5F5F5"}}>
            {loading ? "loading" : error ? "error" : getUsers.map(e => 
                <div key={e.id} style={{textAlign:"center", marginRight:"20px", alignContent:"center", alignItems:"center", justifyContent:"center", justifyItems:"center"}}>
                    <button className={(userSelect.find(z => z === e.username)) ? (classes.custom_button_selected) : (classes.custom_button)} onClick={() => userSelector(e.username)}>
                    <img src={e.image} alt="" style={{width:"80px", height:"80px", borderRadius:"30px"}}/> <br/>
                    <b2>{e.username}</b2>
                    </button>
                </div>)}
        </div>
    );
};

export default UserBar;



            /*
            <Button><Avatar alt="Remy Sharp" src="https://i.pravatar.cc/300" style={{width:"100px", height:"100px", marginLeft:"10px", marginRight:"10px"}}/></Button>
            <Avatar alt="Remy Sharp" src="https://i.pravatar.cc/300" style={{width:"100px", height:"100px", marginLeft:"10px", marginRight:"10px"}}/>
            <Avatar alt="Remy Sharp" src="https://i.pravatar.cc/300" style={{width:"100px", height:"100px", marginLeft:"10px", marginRight:"10px"}}/>
            <Avatar alt="Remy Sharp" src="https://i.pravatar.cc/300" style={{width:"100px", height:"100px", marginLeft:"10px", marginRight:"10px"}}/>
            <Avatar alt="Remy Sharp" src="https://i.pravatar.cc/300" style={{width:"100px", height:"100px", marginLeft:"10px", marginRight:"10px"}}/>
            <Avatar alt="Remy Sharp" src="https://i.pravatar.cc/300" style={{width:"100px", height:"100px", marginLeft:"10px", marginRight:"10px"}}/>
            <Avatar alt="Remy Sharp" src="https://i.pravatar.cc/300" style={{width:"100px", height:"100px", marginLeft:"10px", marginRight:"10px"}}/>
            <Avatar alt="Remy Sharp" src="https://i.pravatar.cc/300" style={{width:"100px", height:"100px", marginLeft:"10px", marginRight:"10px"}}/>
            <Avatar alt="Remy Sharp" src="https://i.pravatar.cc/300" style={{width:"100px", height:"100px", marginLeft:"10px", marginRight:"10px"}}/>
            <Avatar alt="Remy Sharp" src="https://i.pravatar.cc/300" style={{width:"100px", height:"100px", marginLeft:"10px", marginRight:"10px"}}/>
            <Avatar alt="Remy Sharp" src="https://i.pravatar.cc/300" style={{width:"100px", height:"100px", marginLeft:"10px", marginRight:"10px"}}/>
            <Avatar alt="Remy Sharp" src="https://i.pravatar.cc/300" style={{width:"100px", height:"100px", marginLeft:"10px", marginRight:"10px"}}/>
            */