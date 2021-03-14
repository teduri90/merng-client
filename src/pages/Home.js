import React from 'react';
import KakaoMaps from '../components/KakaoMap';
import SideBar from '../components/SideBar';
import UserBar from '../components/UserBar';
import ContentBar from '../components/ContentBar';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));
  
export default function Home() {
    const classes = useStyles();
  
    return (        
      <div className={classes.root}>
        <div style={{marginLeft:"75px"}}>
        <UserBar />
        <Grid container>
          <Grid item xs={8}>
            <KakaoMaps />
          </Grid>
          <Grid item xs={4}>
            <ContentBar />
          </Grid>
        </Grid>
        </div>
      </div>
    );
  }