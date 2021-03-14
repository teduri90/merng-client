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
import { useState } from 'react';

const CREATE_FEEDBACK = gql`
    mutation createFeedback(
      $username: String!
      $body: String!
    ){
      createFeedback(username: $username, body: $body){
        id username body createdAt
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
}));

export default function Feedback(props) {
  const classes = useStyles();
  const onSumbitHandler = (e) => {
    try { 
      createFeedback({ variables: values });
      setValues({body:''});
      e.preventDefault(); // IMPORTANT SOMEHOW
      alert("Thank you for your feedback. We are very much appreciated!")
    } catch (err) {
      alert("error");
      throw new Error(err);
    }
  };

  const [values, setValues] = useState({
    username : "newuser",
    body : "", 
  })
    
  const [createFeedback, { loading } ] = useMutation(CREATE_FEEDBACK);

  return (
    <Container component="main" maxWidth="xs ">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Feedback
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSumbitHandler} style={{maxWidth:"500px"}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                value={values.body}
                onChange={(event) => setValues({username:"newuser", body:event.target.value})}
                name="feedback"
                variant="outlined"
                fullWidth
                multiline
                rows={8}
                id="feedback"
                label="Feedbacks will be much appreciated"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>Submit</Button>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}