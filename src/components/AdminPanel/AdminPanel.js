import React, {useState} from 'react';
import DropzoneItem from '../DropzoneItem/DropzoneItem'
import Annotation from '../Annotation/Annotation'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  app: {
    overflow: 'hidden'
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function AdminPanel() {
  const classes = useStyles();
  const [image, setImage] = useState('')
  const [uploadImg, setUploadImg] = useState(true);
  const [open, setOpen] = useState(false);

  const handleDrop = dropped => {
    const img = dropped[0].type

    if (img == 'image/jpeg' || img == 'image/png' || img == 'image/jpg') {
      const reader = new FileReader()
      reader.readAsDataURL(dropped[0])
      reader.onloadend = function () {
        const result = reader.result
        setImage(result)
      }
      setUploadImg(false)
      setOpen(false)
      return;
    } 

    setOpen(true)
  }

  const uploadNewImage = () => {
    setUploadImg(true)
  }

  return (
    <div className={classes.app}>
      <Snackbar  
        open={open} 
        autoHideDuration={6000}
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
      >
        <Alert severity="error">
        Only image (JPG/JPEG, PNG ) are allowed for upload. Choose another file!
        </Alert>
      </Snackbar>
      {uploadImg ? (
        <DropzoneItem
        getImage={handleDrop}
        accept="image/*"
      />
      ) : (
        <Annotation
         img={image} 
         uploadNewImage={uploadNewImage}
        />
      )}
       
    </div>
  );
}

export default AdminPanel;