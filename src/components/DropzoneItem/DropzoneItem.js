import React from 'react';
import Dropzone from 'react-dropzone'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  dropzone: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '95%',
    height: '90vh',
    margin: '2% auto 0',
    textAlign: 'center',
    boxSizing: 'border-box',
    border: '2px dashed #2278CF',
    borderRadius: 3,
  },
  dropzoneTitle: {
    fontFamily: 'Lato, sans-serif',
    fontweight: 'bold',
    fontSize: 34,
    color: '#2278CF',
    marginBottom: 16,
  },
  dropzoneSubtitle: {
    fontFamily: 'Lato, sans-serif',
    fontSize: 24,
    color: '#9C9E9F',
  }
}));

function DropzoneItem({ getImage }) {
  const classes = useStyles();

  return (
    <Dropzone
      onDrop={(dropped) => getImage(dropped)}
    >
      {({ getRootProps, getInputProps }) => (
        <div {...getRootProps()} className={classes.dropzone}>
          <input data-cy="dropzone" {...getInputProps()} />
          <Typography className={classes.dropzoneTitle}>
            Drop files here or click to upload.
            </Typography>
          <Typography className={classes.dropzoneSubtitle}>
            Only image (JPG/JPEG, PNG ) are allowed for upload.
            </Typography>
        </div>
      )}
    </Dropzone>
  );
}

export default DropzoneItem;