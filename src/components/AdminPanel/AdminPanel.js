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
  // const [image, setImage] = useState('https://www.wallpapermania.eu/images/lthumbs/2013-09/6086_Beautiful-green-path-in-the-forest-HD-nature-wallpaper.jpg')
  const [image, setImage] = useState({
    // src: 'https://www.wallpapermania.eu/images/lthumbs/2013-09/6086_Beautiful-green-path-in-the-forest-HD-nature-wallpaper.jpg',
    // width: 200,
    // height: 200,
  })
  const [uploadImg, setUploadImg] = useState(true);
  const [open, setOpen] = useState(false);

  const handleDrop = dropped => {
    const img = dropped[0].type

    if (img === 'image/jpeg' || img === 'image/png' || img === 'image/jpg') {
      const reader = new FileReader()
      reader.readAsDataURL(dropped[0])
      reader.onloadend = function () {
        const result = reader.result
        let img = new Image();
        img.src = result;
        img.onload = () => setImage({
            src: result,
            height: img.height,
            width: img.width
          })
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