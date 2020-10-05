import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formHeader: {
    position: 'relative',
  },
  formHeaderText: {
    flexGrow: 1,
  },
}));

function FormHeader({ handleCloseForm }) {
  const classes = useStyles();

  return (
    <AppBar className={classes.formHeader}>
    <Toolbar>
      <Typography variant="h6" className={classes.formHeaderText}>
        Hall Creating
        </Typography>
        <IconButton 
          edge="end" 
          aria-label="close" 
          color="inherit"
          onClick={() => handleCloseForm()}
        >
        <CloseIcon />
      </IconButton>
    </Toolbar>
  </AppBar>
  );
}

export default FormHeader;