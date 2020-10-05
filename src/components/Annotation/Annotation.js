import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import AnnotationImage from '../AnnotationImage/AnnotationImage'
import Form from '../Form/Form'
import EditForm from '../Form/EditForm'
import Halls from '../Halls/Halls';

const useStyles = makeStyles((theme) => ({
  annotationWrapper: {
    background: '#E5E5E5',
    padding: '40px 20px',
    boxSizing: 'border-box'
  }, 
  annotatinPaper: {
    height: '100%',
  }, 
  annotatinPaperDif: {
    padding: 24,
  }
}));

function Annotation({ img, uploadNewImage }) {
  const classes = useStyles();
  const [box, setBox] = useState(null)
  const [formIsVisible, setFormIsVisible] = useState(true)
  const [annotations, setAnnotations] = useState([])
  const [newAnnotations, setNewAnnotations] = useState({})
  const [currentAnnotation, setCurrentAnnotation] = useState({})
  const  [currentId, setCurrentId] = useState(null)
  const  [isEdit, setIsEdit] = useState(false)
  const [annotationColor, setAnnotationColor] = useState('')
  
  const handleAnnotationOption = (value) => {
    setBox(value)
    document.body.style.cursor = 'auto'
  }

  const handleSaveForm = (formValues, exist = false) => {
    setFormIsVisible(false)
    
    if (exist === 'exist') {
      setIsEdit(false)
      console.log(123);
      const index = formValues.id
      const array = annotations
      array.splice(index, 1, formValues)
      setAnnotations(array)
      return;
    }
    setAnnotations([...annotations, {
      ...newAnnotations,
      ...formValues,
      id: annotations.length
    }])
  }

  const createAnnotation = (value) => {
    console.log(value, 'val');
    setNewAnnotations(value)
  }

  const handleCloseForm = () => {
    setIsEdit(false)
    setFormIsVisible(false)
  }

  const openForm = (value, type) => {
    let currentAnnotation;
    if (type === 'box') {
      currentAnnotation = annotations.filter(item => item.coordinates.x === value[value.length - 1].x)
    } else if (type === 'dots') {
      console.log(value, value[value.length - 1]);
      currentAnnotation = annotations.filter(item => {
        console.log(item, 'i');
        return item.coordinates[0] === value[value.length - 1].points[0]})
    }
    setCurrentId(currentAnnotation[0].id)
    setCurrentAnnotation(currentAnnotation)
    setIsEdit(true)
  }

  const addAnnoatation = () => {
    setFormIsVisible(true)
  }
console.log(annotationColor);
  return (
    <Grid container spacing={3} className={classes.annotationWrapper}>
      <Grid item md={7} lg={8}>
      <Paper elevation={3}  className={`${classes.annotatinPaper} ${classes.annotatinPaperDif}`}>
        <AnnotationImage 
          img={img} 
          box={box} 
          setBox={setBox} 
          createAnnotation={createAnnotation} 
          openForm={openForm}
        />
      </Paper>
        
      </Grid>
      <Grid item md={5} lg={4}>
        {isEdit ? (
          <Paper elevation={3} className={classes.annotatinPaper}>
            <EditForm 
              handleAnnotationOption={handleAnnotationOption} 
              box={box} 
              handleSaveForm={handleSaveForm}
              uploadNewImage={uploadNewImage}
              currentAnnotation={currentAnnotation}
              handleCloseForm={handleCloseForm}
            />
          </Paper>
        ) :
        formIsVisible ? (
          <Paper elevation={3} className={classes.annotatinPaper}>
            <Form 
              handleAnnotationOption={handleAnnotationOption} 
              box={box} 
              handleSaveForm={handleSaveForm}
              uploadNewImage={uploadNewImage}
              handleCloseForm={handleCloseForm}
              setAnnotationColor={setAnnotationColor}
            />
          </Paper>
        ) : (
          <Paper elevation={3} className={classes.annotatinPaper}>
            <Halls 
              annotations={annotations} 
              addAnnoatation={addAnnoatation}  
              currentId={currentId}
            />
          </Paper>
        )}
        
      </Grid>
    </Grid>
  );
}

export default Annotation;