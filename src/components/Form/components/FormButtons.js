import React from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formTopButtons: {
    marginBottom: 43,
  },
  formButton: {
    textTransform: 'uppercase',
  },
}));

function FormButtons({uploadNewImage}) {
  const classes = useStyles();

  return (
    <Grid container justify="space-between" className={classes.formTopButtons}>
    <Button
      variant="contained"
      color="default"
      className={classes.formButton}
      startIcon={<CloudUploadIcon />}
      onClick={() => uploadNewImage()}
    >
      upload hall image
    </Button>
    <Button
      variant="contained"
      color="secondary"
      className={classes.formButton}
      startIcon={<DeleteIcon />}
    >
      delete hall
    </Button>
  </Grid>
  );
}

export default FormButtons;