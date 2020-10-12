import React, { useEffect, useState, useRef } from 'react';
import Button from '@material-ui/core/Button';
import { Stage, Layer, Line, Rect, Circle, Image, Group } from 'react-konva';
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
  img, box, setBox, createAnnotation, openForm,
  color, text, annotations, setIsDrawn, isDrawn, scale,
  setScale, setImgInitialPosition,
  imgInitialPosition, currentAnnotation, itemToDelete, isEdit,
  setCurrentAnnotation, isSave
}) => {
  const classes = useStyles();
  const [image] = useImage(img.src);
  const ref = useRef()

  //dots
  const [lines, setLines] = useState([]);
  const [isFinish, setIsFinish] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [positionOfShape, setPositionOfShape] = useState([]);
  const [positionOfShapes, setPositionOfShapes] = useState([]);
  const [innerOfDots, setInnerOfDots] = useState([]);
  const isDrawing = React.useRef(false);

  //box
  const [geometry, setGeometry] = useState({});
  const [rectangles, setRectangles] = useState([]);
  const [rectangles1, setRectangles1] = useState([]);
  const [isDrawingRect, setIsDrawingRect] = useState(false);

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
    if (imgInitialPosition) {
      setImgInitialPosition(false)
    }
  }, [imgInitialPosition, box])

  useEffect(() => {
    if (!isEdit) return
    if (!color) return
    let filtered
    if (currentAnnotation[0].type === 'dots') {
      let index
      filtered = innerOfDots.filter((el, i) => {
        if (el.points[0] === currentAnnotation[0].coordinates[0]) {
          index = i;
        }
        return el.points[0] === currentAnnotation[0].coordinates[0]
      })

      filtered = filtered[0]
      filtered = {...filtered, ...paintColor}
      const array = [...innerOfDots]
      array.splice(index, 1, filtered)
      setInnerOfDots(array)
    } else if (currentAnnotation[0].type === 'box') {
      let index
      filtered = rectangles.filter((el, i) => {
        if (el.x === currentAnnotation[0].coordinates.x) {
          index = i;
        }
        return el.x === currentAnnotation[0].coordinates.x
      })

      filtered = filtered[0]
      filtered = {...filtered, ...paintColor}
      const array = [...rectangles]
      array.splice(index, 1, filtered)
      setRectangles(array)
    }

    if (isSave) {
      setCurrentAnnotation([{
        ...currentAnnotation[0],
        ...paintColor
      }])
    }
  }, [isEdit, paintColor])

  useEffect(() => {
    let filtered
    let filteredDots
    if (Object.keys(itemToDelete).length !== 0) {
      if (itemToDelete.type === 'dots') {
        filtered = innerOfDots.filter(el => el.points[0] !== itemToDelete.coordinates[0])
        setInnerOfDots(filtered)
        filteredDots = positionOfShapes.filter(el => el[0].x !== itemToDelete.coordinates[0])
        // filteredDots = positionOfShapes.filter(el => +el[0].name !== itemToDelete.nameOfShape)
        setPositionOfShapes(filteredDots)
        return
      }
      if (itemToDelete.type === 'box') {
        filtered = rectangles.filter(el => el.x !== itemToDelete.coordinates.x)
        setRectangles(filtered)
      }
    }
  }, [itemToDelete])

  const handleScale = (event, newValue) => {
    setScale(newValue)
  }

  const handleMouseDown = (e) => {
    if (box === null || color === undefined) return

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
      setPositionOfShape([...positionOfShape, { x, y, ...paintColor, name: `${x}` }])

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
      setPositionOfShape([...positionOfShape, { x, y, ...paintColor, name: `${x}` }])
    }

    if (isFinish) {
      isDrawing.current = false
      setIsFinish(false)
      setBox(null)
      setInnerOfDots([...innerOfDots, ...lines])
      setPositionOfShape([])
      setPositionOfShapes([...positionOfShapes, positionOfShape])
      setLines([])
      setIsDrawn(true)
      setDragCoordinates({})
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
    console.log(lines);
    setIsFinish(true)
    createAnnotation({
      type: 'dots',
      coordinates: lines[lines.length - 1].points,
      nameOfShape: lines[lines.length - 1].points[0],
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
      setGeometry({ x: (x / scale), y: (y / scale), width: 0, height: 0 })
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
    if (!box || color === undefined) return

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
    setDragCoordinates({})
  }

  const handleMove = (e) => {
    if (!box || !isDrawingRect) return

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

  // const handleVertexDragMove = (e) => {
  //   document.body.style.cursor = 'move';
  //   const activeVertex = e.target;
  //   const group = activeVertex.getParent();
  //   const line = group.get('Line')[0];
  //   const linePoints = [];
  //   let index;
  //   let currentShape = innerOfDots.find((el, i) => {
  //     if (el.name === line.attrs.name) {
  //       index = i
  //     }
  //     return el.name === line.attrs.name
  //   })
  //   console.log(currentShape);
  //   positionOfShapes[index].forEach(el => {
  //     if (el.name !== activeVertex.attrs.name) {
  //       linePoints.push(el.x); linePoints.push(el.y)
  //       return
  //     }
  //     el.x = activeVertex.x()
  //     el.y = activeVertex.y()
  //     linePoints.push(activeVertex.x()); linePoints.push(activeVertex.y())
  //   })
    
  //   line.points(linePoints)
  //   // linePoints.push(linePoints[0])
  //   // linePoints.push(linePoints[1])
  //   // currentShape = {...currentShape, points: linePoints}
  //   // const array = [...innerOfDots]
  //   // array.splice(index, 1, currentShape)
  //   // setInnerOfDots(array)
  // };

  const handleVertexMouseOver = () => {
    document.body.style.cursor = 'move';
  };

  const handleMouseOut = (isAdding) => {
    document.body.style.cursor = isAdding ? 'crosshair' : 'default';
  };

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
            />
            {innerOfDots.map((poligon, index) => {
              const filtered = annotations.filter(el => el.type === 'dots')

              return (
                <>
                  <Group draggable={true}>
                    {/* <LabelText
                    x={poligon.points[0]}
                    y={poligon.points[1]}
                    text={filtered[index] ? filtered[index].formValues.name : text}
                  /> */}
                    <Line
                      name={poligon.name}
                      points={poligon.points}
                      stroke={poligon.color.out}
                      fill={poligon.color.inner}
                      strokeWidth={2}
                      dash={[8, 5]}
                      closed={true}
                      onMouseOver={() => (document.body.style.cursor = 'pointer')}
                      onMouseLeave={() => (document.body.style.cursor = 'auto')}
                      lineCap="round"
                      onClick={() => openForm(innerOfDots[index], 'dots')}
                    />

                    {positionOfShapes.map((item, i) => {
                      if (i !== index) return
                      return (
                        <>
                          {item.map((rectangle, i) => (
                            <Rect
                              name={rectangle.name}
                              x={rectangle.x - 2}
                              y={rectangle.y - 2}
                              stroke={poligon.color.out}
                              fill={poligon.color.inner}
                              width={4}
                              height={4}
                              draggable
                              // onDragMove={ e => handleVertexDragMove(e, innerOfDots) }
                              onMouseOver={ handleVertexMouseOver }
                              handleMouseOut={() => handleMouseOut(isDrawing.current)}
                              dragOnTop={false}
                              onFocus={() => { }}
                              onBlur={() => { }}
                            />
                          ))}
                        </>
                      )
                    })}
                  </Group>
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
                onMouseOver={() => (document.body.style.cursor = 'cell')}
                onMouseLeave={() => (document.body.style.cursor = 'crosshair')}
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
                      text={filtered[index] ? filtered[index].formValues.name : text}
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
                      onMouseOver={() => (document.body.style.cursor = 'pointer')}
                      onMouseLeave={() => (document.body.style.cursor = 'auto')}
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