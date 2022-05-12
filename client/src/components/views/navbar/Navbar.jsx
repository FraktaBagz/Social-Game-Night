import React, { useState } from "react";
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const Navbar = ({ handleViewClick, pageView }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" onClick={() => handleViewClick("HomePage")}><strong><span className="apples-logo">Apples</span> <span className="to-logo">to</span> <span className="oranges-logo">Oranges</span></strong></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className={pageView === "HomePage" ? "nav-link active" : "nav-link"} onClick={() => handleViewClick("HomePage")}>Home</a>
              <a className={pageView === "Lobby" ? "nav-link active" : "nav-link"} onClick={() => handleViewClick("Lobby")}>Lobby</a>
              <a className={pageView === "CustomDeck" ? "nav-link active" : "nav-link"} onClick={() => handleViewClick("CustomDeck")}>Custom Decks</a>
              <a className="nav-link" onClick={handleClickOpen}>Rules</a>
            </div>
          </div>
        </div>
      </nav>
      <div>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
            How to Play
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              Each player draws 7 answer cards. A judge is selected for the 1st turn.
              The current judge of the turn rotates, so each player gets a turn as judge.
              The player that is the judge of the turn draws a green card from the deck.
              Each player selects a red card that they think best fits the prompt card.
              (The judge does not submit answer cards on their turn.)
            </Typography>
            <Typography gutterBottom>
              Once each player has selected their cards to answer the prompt, the judge for
              the round reads each answer and selects the answer the like the best.
              The player that submitted the winning answer card for that turn gets a point.
              Once each player has been the judge, the game is over.
              The player that has the most points by the end of the game wins!
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Close
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </div>
    </>
  );
};

export default Navbar;
