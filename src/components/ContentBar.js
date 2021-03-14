import React, { useState, useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import { contextProp } from '../context/ContextProp';
import { rgbToHex } from '@material-ui/core';
import { set } from 'mongoose';

const ContentBar = () => {  
    const {categorySelect, setCategorySelect, userSelect, setUserSelect, loading, getMarkers, error, getUsers, setZoomLevel, setSelectLat, setSelectLng } = useContext(contextProp);

    var temporary;
    if(getMarkers){
      if(userSelect.length > 0){
        temporary = getMarkers.filter(e => categorySelect.includes(e.category)).filter(e => userSelect.includes(e.username))
        console.log("yes");
      } else {
        temporary = getMarkers.filter(e => categorySelect.includes(e.category))
      }
    };

    const triggerer = (e) => {
      setZoomLevel("3");
      setSelectLat(e.lat);
      setSelectLng(e.lng);
    };

    return (
      <Box overflow="auto" alignContent="right" alignItems="right" alignSelf="right" style={{['@media (min-width:780px)']:{width:"0%"}}}> 
      {loading ? "loading" : error ? "error" :  
         temporary.map(e=> 
            <Card onClick={() => triggerer(e)}>
            <Divider />
            <CardActionArea>
              <CardMedia
                image="/static/images/cards/contemplative-reptile.jpg"
                title="Contemplative Reptile"
              />
              <CardContent>
                <div style={{borderWidth:"10px", borderColor:"black", paddingTop:"2px", paddingBottom:"2px", marginBottom:"5px", alignContent:"center", alignItems:"center",textAlign:"center", color:"#3f51b5", textAlign:"center", display:"flex"}}>
                  <img src={e.image} style={{width:"40px", height:"40px", marginRight:"10px"}}></img>
                  <Typography gutterBottom variant="h5" component="h4">{e.username}</Typography>
                </div>
                <Typography gutterBottom variant="h7" component="h4">
                  {e.body} ({e.category})
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                </Typography>
              </CardContent>
            </CardActionArea>
            
          </Card>
          )}    
      </Box>


    )
}

export default ContentBar;

/*

            <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
              <Button size="small" color="primary">
                Learn More
              </Button>
            </CardActions>

            */