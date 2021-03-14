import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { gql, useMutation } from '@apollo/react-hooks';
import { useState, useContext } from 'react';

import { AuthContext } from '../context/auth';

const REGISTER_USER = gql`
    mutation register(
      $username: String!
      $email: String!,
      $password: String!,
      $confirmPassword: String!,
      $image: String!,
    ){
      register(username: $username, email: $email, password: $password, confirmPassword: $confirmPassword, image: $image ){
        id username email createdAt token
      }
    }
`
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  custom_image : {
    '&:hover': {
      cursor: 'pointer',
      transform: 'scale(1.25)',
    },
    borderRadius: "50px"
  },
  custom_image_selected : {
    '&:hover': {
      cursor: 'pointer',
      transform: 'scale(1.25)',
    },
  }
}));

export default function Register(props) {
  const classes = useStyles();

  const context = useContext(AuthContext);

  const [userInfo, setUserInfo ] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "https://i.ibb.co/8Km7y8g/1.png",
  })

  const onSumbitHandler = (e) => {
    try { 
      console.log(userInfo);
      registerUser({ variables: userInfo });
      setUserInfo({   
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        image: "",
      })
      e.preventDefault(); // IMPORTANT SOMEHOW
      alert("Account is created")
    } catch (err) {
      alert("error");
      throw new Error(err);
    }
  };
    
  const [registerUser, { loading } ] = useMutation(REGISTER_USER, {
    update(_, { data : { register : userData }}){
      context.login(userData);
      props.history.push('/');
    }
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSumbitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                value={userInfo.email}
                onChange={(event) => setUserInfo({...userInfo, email : event.target.value})}
                name="email"
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                value={userInfo.username}
                onChange={(event) => setUserInfo({...userInfo, username : event.target.value})}
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={userInfo.password}
                onChange={(event) => setUserInfo({...userInfo, password : event.target.value})}
                name="password"
                variant="outlined"
                required
                fullWidth
                id="password"
                label="Password"
                type="password"
              />
            </Grid>            
            <Grid item xs={12}>
              <TextField
                value={userInfo.confirmPassword}
                onChange={(event) => setUserInfo({...userInfo, confirmPassword : event.target.value})}
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="confirmPassword"
                type="password"
                id="confirmPassword"
              />
            </Grid>
            <Grid item xs={12}>
                {userInfo.image ? "" :<div><h3>Select your profile image</h3></div>}
            </Grid>
            {/*<Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>*/}
          </Grid>
            
        <div>
          <img className={(userInfo.image === "https://i.ibb.co/8Km7y8g/1.png") ? classes.custom_image_selected : classes.custom_image }  src="https://i.ibb.co/8Km7y8g/1.png" onClick={() => setUserInfo({...userInfo, image : "https://i.ibb.co/8Km7y8g/1.png"})} />
          <img className={(userInfo.image === "https://i.ibb.co/4TdydJy/2.png") ? classes.custom_image_selected : classes.custom_image }  src="https://i.ibb.co/4TdydJy/2.png" onClick={() => setUserInfo({...userInfo, image : "https://i.ibb.co/4TdydJy/2.png"})} />
          <img className={(userInfo.image === "https://i.ibb.co/wK2jXss/3.png") ? classes.custom_image_selected : classes.custom_image }  src="https://i.ibb.co/wK2jXss/3.png" onClick={() => setUserInfo({...userInfo, image : "https://i.ibb.co/wK2jXss/3.png"})} />
          <img className={(userInfo.image === "https://i.ibb.co/Rvc4Bzj/4.png") ? classes.custom_image_selected : classes.custom_image }  src="https://i.ibb.co/Rvc4Bzj/4.png" onClick={() => setUserInfo({...userInfo, image : "https://i.ibb.co/Rvc4Bzj/4.png"})} />
          <img className={(userInfo.image === "https://i.ibb.co/Gx1S9Sp/5.png") ? classes.custom_image_selected : classes.custom_image }  src="https://i.ibb.co/Gx1S9Sp/5.png" onClick={() => setUserInfo({...userInfo, image : "https://i.ibb.co/Gx1S9Sp/5.png"})} />
          <img className={(userInfo.image === "https://i.ibb.co/mXYFwvD/6.png") ? classes.custom_image_selected : classes.custom_image }  src="https://i.ibb.co/mXYFwvD/6.png" onClick={() => setUserInfo({...userInfo, image : "https://i.ibb.co/mXYFwvD/6.png"})} />
          <img className={(userInfo.image === "https://i.ibb.co/2gtbGMQ/7.png") ? classes.custom_image_selected : classes.custom_image }  src="https://i.ibb.co/2gtbGMQ/7.png" onClick={() => setUserInfo({...userInfo, image : "https://i.ibb.co/2gtbGMQ/7.png"})} />
          <img className={(userInfo.image === "https://i.ibb.co/VpWY5b1/8.png") ? classes.custom_image_selected : classes.custom_image }  src="https://i.ibb.co/VpWY5b1/8.png" onClick={() => setUserInfo({...userInfo, image : "https://i.ibb.co/VpWY5b1/8.png"})} />
        </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
      
    </Container>
  );
}