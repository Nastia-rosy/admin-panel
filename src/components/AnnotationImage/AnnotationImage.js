import React, { useEffect, useState, useRef } from 'react';
import Button from '@material-ui/core/Button';
import { Stage, Layer, Line, Rect, Circle, Image } from 'react-konva';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
// import LabelText from './components/Label';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import useImage from 'use-image';
import Slider from '@material-ui/core/Slider';

import styles from '../../styles/annotationImageStyle'

const useStyles = makeStyles(styles);

const AnnotationImage = ({ 
    img, 
    box, 
    setBox, 
    createAnnotation, 
    openForm, 
    color, 
    text, 
    annotations, 
    setIsDrawn, 
    isDrawn,
    scale,
    setScale,
    setImgInitialPosition,
    imgInitialPosition
  }) => {
  const classes = useStyles();
  const [image] = useImage(img.src);
  const ref = useRef()

  //box
  const [lines, setLines] = useState([]);
  const [isFinish, setIsFinish] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [positionOfShape, setPositionOfShape] = useState([]);
  const [innerOfDots, setInnerOfDots] = useState([]);
  const isDrawing = React.useRef(false);

  //rect
  const [geometry, setGeometry] = useState({});
  const [rectangles, setRectangles] = useState([]);
  const [rectangles1, setRectangles1] = useState([]);
  const [isDrawingRect, setIsDrawingRect] = useState(false);

  //annotation text
  const [labelText, setLabelText] = useState([]);

  //color
  const [paintColor, setPaintColor] = useState({})
  const col = color ? color[0] : 'rgba(0, 0,0)'
  const opacityCol = color ? color[1] : 'rgba(0,0,0,0.5)'

  const [dragCoordinates, setDragCoordinates] = useState(0);

  useEffect(() => {
    const col = color ? color[0] : 'rgba(0, 0,0)'
    const opacityCol = color ? color[1] : 'rgba(0,0,0,0.5)'
    const name = color && color[2]
    setPaintColor({ color: { out: col, inner: opacityCol, name } })
  }, [color])

  useEffect(() => {
    if (!text) {
      return
    }
    setLabelText([...labelText, text])
  }, [text, labelText])

  // useEffect(() => {
  //   if (imgInitialPosition) {
  //     setImgInitialPosition(false)
  //   }
  // }, [imgInitialPosition, box])

  const handleScale = (event, newValue) => {
    setScale(newValue)
  }

  const handleMouseDown = (e) => {
    if (box === null || color === undefined) {
      return
    }
    //setImgInitialPosition(false)
    if (box && !isDrawn) {
      
      handleStartCreateRectangle(e)
      return
    }

    if (!isStart && !isDrawing.current && !isDrawn) {
      setIsStart(true)
      isDrawing.current = true;
      const pos = e.target.getStage().getPointerPosition();
      let x = pos.x;
      let y = pos.y
      if (Object.entries(dragCoordinates).length !== 0) {
        x = pos.x - dragCoordinates.x;
        y = pos.y - dragCoordinates.y
      }
      if (scale !== 1) {
        x = x / scale
        y = y / scale
      }

      setLines([...lines, { points: [x, y], ...paintColor }]);
      setPositionOfShape([...positionOfShape, { x, y }])
      
    } else if (isDrawing && !isStart && !isDrawn) {

      const pos = e.target.getStage().getPointerPosition();
      let x = pos.x;
      let y = pos.y
      if (Object.entries(dragCoordinates).length !== 0) {
        x = pos.x - dragCoordinates.x;
        y = pos.y - dragCoordinates.y
      }
      if (scale !== 1) {
        x = x / scale
        y = y / scale
      }
      setLines([...lines, { points: [x, y], ...paintColor }]);

      let lastLine = lines[lines.length - 1];
      // add point
      lastLine.points = lastLine.points.concat([x, y]);

      // // replace last
      lines.splice(lines.length - 1, 1, lastLine);
      setLines(lines.concat());
      setPositionOfShape([...positionOfShape, { x, y }])
    }

    if (isFinish) {
      isDrawing.current = false
      setIsFinish(false)
      setBox(null)
      setInnerOfDots([...innerOfDots, ...lines])
      setPositionOfShape([])
      setLines([])
      setIsDrawn(true)
    }

    setIsStart(false)

    if (isDrawing.current) {
      document.body.style.cursor = 'crosshair'
    }

  };

  const handleFinishPoligon = () => {
    if (isDrawing.current && positionOfShape.length < 2) {
      return;
    }
    setIsFinish(true)
    createAnnotation({
      type: 'dots',
      coordinates: lines[lines.length - 1].points,
      ...paintColor
    })

    document.body.style.cursor = 'auto'
  }

  const handleStartCreateRectangle = (e) => {
    setIsDrawingRect(true)
    const pos = e.target.getStage().getPointerPosition();
    let x = pos.x
    let y = pos.y
    if (Object.entries(dragCoordinates).length !== 0) {
      x = pos.x - dragCoordinates.x;
      y = pos.y - dragCoordinates.y
    }

    if (scale !== 1) {
      setGeometry({
        x: (x / scale),
        y: (y / scale),
        width: 0,
        height: 0
      })
      return
    }
    setGeometry({
      x,
      y,
      width: 0,
      height: 0
    })
  }

  const handleEndCreateRectangle = (e) => {
    setIsDrawingRect(false)
    if (!box) {
      return
    }
    if (color === undefined) {
      return
    }
    const pos = e.target.getStage().getPointerPosition();
    let x = pos.x
    let y = pos.y
    if (Object.entries(dragCoordinates).length !== 0) {
      x = pos.x - dragCoordinates.x;
      y = pos.y - dragCoordinates.y
    }
    if (scale !== 1) {
      x = x / scale
      y = y / scale
    }

    setRectangles1([])
    setRectangles([...rectangles, {
      ...geometry,
      width: x - geometry.x,
      height: y - geometry.y,
      ...paintColor
    }])

    createAnnotation({
      type: 'box',
      ...paintColor,
      coordinates: {
        ...geometry,
        width: x - geometry.x,
        height: y - geometry.y,
      }
    })

    setBox(null)
    setIsDrawn(true)
  }

  const handleMove = (e) => {
    if (!box) {
      return
    }

    if (!isDrawingRect) {
      return
    }
    const pos = e.target.getStage().getPointerPosition();
    let x = pos.x
    let y = pos.y
    if (Object.entries(dragCoordinates).length !== 0) {
      x = pos.x - dragCoordinates.x;
      y = pos.y - dragCoordinates.y
    }

    if (scale !== 1) {
      x = x / scale
      y = y / scale
    }

    setRectangles1([{
      ...geometry,
      width: x - geometry.x,
      height: y - geometry.y,
    }])
  }

  return (
    <div className={classes.annotationWrapper}>
      <Grid container justify="flex-end" className={classes.buttonWrapper}>
        <Button
          variant="contained"
          color="default"
          className={classes.editButton}
          startIcon={<EditIcon />}
        >
          edit image
          </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.annotationButton}
          startIcon={<DeleteIcon />}
        >
          delete
          </Button>
      </Grid>
      <Grid container justify='center' className={classes.wrapper} ref={ref}>
        <Stage
          className={classes.wrapperForAnnotation}
          width={img.width}
          height={img.height}
          scaleX={scale}
          scaleY={scale}
          x={imgInitialPosition ? 0 : null}
          y={imgInitialPosition ? 0 : null}
          onMouseDown={handleMouseDown}
          onMouseUp={handleEndCreateRectangle}
          onMouseMove={handleMove}
          draggable={box === null}
              onDragMove={() => {
                document.body.style.cursor = 'grabbing'
              }}
          onDragEnd={() => document.body.style.cursor = 'default'}
          dragBoundFunc={(e) => setDragCoordinates(e)}
        >
          <Layer>
            <Image
              image={image}
              width={img.width}
              x={imgInitialPosition ? 0 : null}
              y={imgInitialPosition ? 0 : null}
            />
            {innerOfDots.map((item, i) => {
              // const filtered = annotations.filter(el => el.type === 'dots')
              return (
                <>
                  {/* <LabelText
                    x={item.points[0]}
                    y={item.points[1]}
                    text={filtered[i] ? filtered[i].formValues.name : text}
                  /> */}
                  <Line
                    points={item.points}
                    stroke={item.color.out}
                    fill={item.color.inner}
                    strokeWidth={2}
                    dash={[8, 5]}
                    closed={true}
                    draggable
                    lineCap="round"
                    onClick={() => openForm(innerOfDots[i], 'dots')}
                  />
                </>)
            })}
            {lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke={line.color.out}
                strokeWidth={2}
                dash={[8, 5]}
                lineCap="round"
              />
            ))}

            {positionOfShape[0] ? (
              <Circle
                x={positionOfShape[0].x}
                y={positionOfShape[0].y}
                radius={5}
                stroke={col}
                fill={opacityCol}
                strokeWidth={1}
                draggable
                onMouseDown={handleFinishPoligon}
                // onMouseOver={() => (!isStart && !isDrawing.current) && (document.body.style.cursor = 'cell')}
                onFocus={() => { }}
                onBlur={() => { }}
              />
            ) : null}
            {positionOfShape.map((rectangle, i) => {
              if (i === 0) {
                return <></>;
              }
              return (
                <Rect
                  x={rectangle.x - 2}
                  y={rectangle.y - 2}
                  stroke={col}
                  fill={col}
                  width={4}
                  height={4}
                  draggable
                  dragOnTop={false}
                  onFocus={() => { }}
                  onBlur={() => { }}
                />)
            })}

            <Rect
              x={rectangles1[0] && rectangles1[0].x}
              y={rectangles1[0] && rectangles1[0].y}
              stroke={col}
              dash={[8, 5]}
              width={rectangles1[0] && rectangles1[0].width}
              height={rectangles1[0] && rectangles1[0].height}
              onFocus={() => { }}
              onBlur={() => { }}
            />
            {rectangles ? (
              rectangles.map((rect, i) => {
                // const filtered = annotations.filter(item => item.type === 'box')
                return (
                  <>
                    {/* <LabelText
                      x={rect.x}
                      y={rect.y}
                      text={filtered[i] ? filtered[i].formValues.name : text}
                    /> */}
                    <Rect
                      x={rect.x}
                      y={rect.y}
                      stroke={rect.color.out}
                      fill={rect.color.inner}
                      width={rect.width}
                      height={rect.height}
                      draggable
                      onClick={() => openForm(rectangles[i], 'box')}
                      dash={[8, 5]}
                      onFocus={() => { }}
                      onBlur={() => { }}
                    />
                  </>
                )
              })
            ) : null}
          </Layer>
        </Stage>
        <Slider
          value={scale}
          onChange={handleScale}
          step={0.1}
          defaultValue={1}
          max={2}
          className={classes.slider}
        />
      </Grid>
    </div>
  );
};


export default AnnotationImage;