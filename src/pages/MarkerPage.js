import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import { useState, useContext } from 'react';
import { AuthContext } from '../context/auth';
import { gql, useMutation } from '@apollo/react-hooks';

const CREATE_MARKER = gql`
    mutation createMarker(
      $lat: String!,
      $lng: String!,
      $body: String!,
      $category: String!,
    ){
      createMarker(lat: $lat, lng: $lng, body: $body, category: $category){
        id username lat lng body
      }
    }
`

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function MarkerPage({open, setOpen, X, Y, placeName33, props}) {
  const classes = useStyles();
  const { user } = useContext(AuthContext);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [createMarkers, { loading } ] = useMutation(CREATE_MARKER, {
    update(_, {}){
        props.history.push('/');
    }
  });

const closure = () => {
    createMarkers({
        variables: {
            lat: Y,
            lng: X,
            body: placeName33,
            category: "restaurant" 
        }
        }
    )
    setOpen(false);
  }

  return (
    <div>
      {/*<button type="button" onClick={handleOpen}>
        react-transition-group
        </button>*/}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Add Marker</h2>
            {user && <p id="transition-modal-description"> USERNAME : {user.username}</p>}
            <p id="transition-modal-description"> PLACENAME : {placeName33}</p>
            <p id="transition-modal-description"> LAT : {X} </p>
            <p id="transition-modal-description"> LNG : {Y} </p>
            <p id="transition-modal-description"> CATEGORY : restaurant </p>
            {user && loading ? "loading" :
                <button 
                    onClick={() => closure()}
                >ADD</button>}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}