import React, { useState, useEffect, useCallback } from 'react';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import AnnotationImage from '../AnnotationImage/AnnotationImage'
import Form from '../Form/Form'
import EditForm from '../Form/OpenForm'
import Halls from '../Halls/Halls';

const useStyles = makeStyles((theme) => ({
  annotationWrapper: {
    background: 'inherit',
    padding: '40px 0',
    boxSizing: 'border-box'
  }, 
  annotatinPaper: {
    height: 'auto',
  }, 
  annotatinPaperDif: {
    padding: 24,
    height: 'auto',
  }
}));

function Annotation({ img, uploadNewImage }) {
  const classes = useStyles();
  const [box, setBox] = useState(null)
  const [formIsVisible, setFormIsVisible] = useState(true)
  const [annotations, setAnnotations] = useState([])
  const [newAnnotations, setNewAnnotations] = useState({})
  const [currentAnnotation, setCurrentAnnotation] = useState({})
  const [currentId, setCurrentId] = useState(null)
  const [isEdit, setIsEdit] = useState(false)
  const [annotationColor, setAnnotationColor] = useState('')
  const [changeColor, setChangeColor] = useState('')
  // const [annotationName, setAnnotationName] = useState('')
  const [isDrawn, setIsDrawn] = useState(false)
  const [scale, setScale] = React.useState(1);
  const [imgInitialPosition, setImgInitialPosition] = React.useState(false);

  const getColor = useCallback(
    () => {
      switch (annotationColor) {
      case 'White':
        return ['rgb(255,255,255)', 'rgb(255,255,255, 0.5)', 'White' ]
      case 'Red':
        return ['rgb(223,75,38)', 'rgb(223,75,38,0.5)', 'Red']
      case 'Yellow' : 
        return ['rgb(255,255,0)', 'rgb(255,255,0, 0.5)', 'Yellow']
      case 'Blue':
        return ['rgb(0,0,255)', 'rgb(0,0,255, 0.5)', 'Blue']
      default:
        return;
      }
    },
    [annotationColor],
  );

  useEffect(() => {
    const color = getColor()
    setChangeColor(color)
  }, [annotationColor, getColor]);

  const handleAnnotationOption = (value) => {
    if (isDrawn) {
      return
    }
    setBox(value)
    document.body.style.cursor = 'auto'
  }

  const handleSaveForm = (formValues, exist = false) => {
    setImgInitialPosition(true)
    setFormIsVisible(false)
    setIsDrawn(false)
    setAnnotationColor('')
    // setAnnotationName('')
    setScale(1)
    if (exist === 'exist') {
      setIsEdit(false)
      const index = formValues.id
      const array = annotations
      array.splice(index, 1, formValues)
      setAnnotations(array)
      return;
    }
    if (currentAnnotation)
    setAnnotations([...annotations, {
      ...newAnnotations,
      ...formValues,
      id: annotations.length
    }])
  }

  const createAnnotation = (value) => {
    setNewAnnotations(value)
  }

  const handleCloseForm = () => {
    setImgInitialPosition(true)
    setScale(1)
    setIsEdit(false)
    setFormIsVisible(false)
  }

  const openForm = (value, type) => {
    setImgInitialPosition(true)
    setScale(1)
    if (isEdit) {
      setIsEdit(false)
    }
    if (!annotations) {
      return
    }

    let currentAnnotation;
    if (type === 'box') {
      currentAnnotation = annotations.filter(item => item.coordinates.x === value.x)
    } else if (type === 'dots') {
      currentAnnotation = annotations.filter(item => {
      return item.coordinates[0] === value.points[0]})
    }

   if (Boolean(!currentAnnotation[0])) {
     return
   }
    setCurrentId(currentAnnotation[0].id)
    setCurrentAnnotation(currentAnnotation)
    setIsEdit(true)
  }

  const addAnnoatation = () => {
    setImgInitialPosition(true)
    setScale(1)
    setFormIsVisible(true)
  }

  const getName = (value) => {
    //  setAnnotationName(value)
  }

  return (
    <Grid container spacing={3} className={classes.annotationWrapper} justify="center">
      <Grid item xs={12} sm={12} md={7} lg={8}>
      <Paper elevation={3}  className={classes.annotatinPaperDif}>
        <AnnotationImage 
          img={img} 
          box={box} 
          setBox={setBox} 
          createAnnotation={createAnnotation} 
          openForm={openForm}
          color={changeColor}
          // text={annotationName}
          annotations={annotations}
          setIsDrawn={setIsDrawn}
          isDrawn={isDrawn}
          setScale={setScale}
          scale={scale}
          setImgInitialPosition={setImgInitialPosition}
          imgInitialPosition={imgInitialPosition}
        />
      </Paper>
        
      </Grid>
      <Grid item xs={12} sm={10} md={5} lg={4}>
        {isEdit ? (
          <Paper elevation={3} className={classes.annotatinPaper}>
            <EditForm 
              handleAnnotationOption={handleAnnotationOption}  
              handleSaveForm={handleSaveForm}
              uploadNewImage={uploadNewImage}
              currentAnnotation={currentAnnotation}
              handleCloseForm={handleCloseForm}
              setAnnotationColor={setAnnotationColor}
            />
          </Paper>
        ) :
        formIsVisible ? (
          <Paper elevation={3} className={classes.annotatinPaper}>
            <Form 
              handleAnnotationOption={handleAnnotationOption} 
              handleSaveForm={handleSaveForm}
              uploadNewImage={uploadNewImage}
              handleCloseForm={handleCloseForm}
              setAnnotationColor={setAnnotationColor}
              getName={getName}
              isDrawn={isDrawn}
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