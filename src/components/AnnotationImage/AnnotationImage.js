import React from 'react';
import Button from '@material-ui/core/Button';
import { Stage, Layer, Line, Rect, Circle } from 'react-konva';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
// import LabelText from './components/Label';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  uploadImgButton: {
    display: 'block',
    margin: '0 auto 10px',
    color: '#fff',
    backgroundColor: 'rgba(30, 139, 195, 0.5)',
    boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
  },
  annotationWrapper: {
    width: '100%',
    height: 'auto'
  },
  wrapper: {
    position: 'relative',
    height: '100%',
  },
  wrapperForAnnotation: {
    height: '100%',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  },
  annotationButton: {
    marginLeft: 8,
    textTransform: 'uppercase'
  },
  editButton: {
    textTransform: 'uppercase'
  },
  buttonWrapper: {
    marginBottom: 24
  }
}));

const AnnotationImage = ({ img, box, setBox, createAnnotation, openForm }) => {
  const classes = useStyles();

  //box
  const [lines, setLines] = React.useState([]);

  const [isFinish, setIsFinish] = React.useState(false);
  const [isStart, setIsStart] = React.useState(false);
  const [positionOfShape, setPositionOfShape] = React.useState([]);
  const [coordinatesOfShape, setCoordinatesOfShape] = React.useState([]);
  const [innerOfDots, setInnerOfDots] = React.useState([]);
  const isDrawing = React.useRef(false);

  //rect
  const [geometry, setGeometry] = React.useState({});
  const [rectangles, setRectangles] = React.useState([]);
  // const [rectHeight, setRectHeight] = React.useState(0);
  const [rectangles1, setRectangles1] = React.useState([]);
  const [isDrawingRect, setIsDrawingRect] = React.useState(false);

  //annotation text
  // const [labelText, setLabelText] = React.useState([]);
  //label 
  // const [labelOn, setLabelOn] = React.useState(true);

  const handleMouseDown = (e) => {
    if (box === null) {
      return
    }
    if (box) {
      handleStartCreateRectangle(e)
      return
    }
    if (!isStart && !isDrawing.current) {
      setIsStart(true)
      isDrawing.current = true;
      const pos = e.target.getStage().getPointerPosition();
      setLines([...lines, { points: [pos.x, pos.y] }]);
      setPositionOfShape([...positionOfShape, { x: pos.x, y: pos.y }])
      setCoordinatesOfShape([...coordinatesOfShape, pos.x, pos.y ])

    } else if (isDrawing && !isStart) {

      const pos = e.target.getStage().getPointerPosition();
      setLines([...lines, { points: [pos.x, pos.y] }]);
      const stage = e.target.getStage();
      const point = stage.getPointerPosition();

      let lastLine = lines[lines.length - 1];
      // add point
      lastLine.points = lastLine.points.concat([point.x, point.y]);

      // // replace last
      lines.splice(lines.length - 1, 1, lastLine);
      setLines(lines.concat());
      setPositionOfShape([...positionOfShape, { x: pos.x, y: pos.y }])
      setCoordinatesOfShape([...coordinatesOfShape, pos.x, pos.y ])
    }

    if (isFinish) {
      isDrawing.current = false
      setIsFinish(false)
      setBox(null)
      setInnerOfDots(lines)
      setPositionOfShape([])
    }

     setIsStart(false)

    if (isDrawing.current) {
      document.body.style.cursor = 'crosshair'
    }
      
  };

  const handleFinishbox = () => {
    if (isDrawing.current && positionOfShape.length < 2) {
      return;
    }
    setIsFinish(true)
    createAnnotation({
      coordinates: lines[lines.length - 1].points
    })
    // setShowTextEditor(true)
    

    document.body.style.cursor = 'auto'
  }

  // const [image, setImage] = React.useState(img)

  // const handleDrop = dropped => {
  //   const reader = new FileReader()
  //   reader.readAsDataURL(dropped[0])
  //   reader.onloadend = function () {
  //     const result = reader.result
  //     setImage(result)
  //   }

  //   setPositionOfShape([])
  //   setLines([])
  //   setRectangles([])
  //   setRectangles1([])
  //   setLabelText([])
  // }

  const handleStartCreateRectangle = (e) => {
    setIsDrawingRect(true)
    const pos = e.target.getStage().getPointerPosition();

    setGeometry({
      x: pos.x,
      y: pos.y,
      width: 0,
      height: 0
    })
  }

  const handleEndCreateRectangle = (e) => {
    setIsDrawingRect(false)
    if (!box) {
      return
    }
    const pos = e.target.getStage().getPointerPosition();

    setRectangles([...rectangles, {
      ...geometry,
      width: pos.x - geometry.x,
      height: pos.y - geometry.y,
    }])
    setRectangles1([...rectangles1, {
      ...geometry,
      width: pos.x - geometry.x,
      height: pos.y - geometry.y,
    }])

    createAnnotation({
      type: 'box',
      coordinates: {
        ...geometry,
        width: pos.x - geometry.x,
        height: pos.y - geometry.y,
      }
    })

    setBox(null)
  }

  // const onSubmit = (value) => {
  //   if (value) {
  //     setLabelText(
  //       [...labelText, {
  //         x: box ? geometry.x : coordinates.x,
  //         y: box ? geometry.y : coordinates.y,
  //         text: value
  //       }]
  //     )
  //   }

  //   setShowTextEditor(false)
  //   setShowFancyRect(false)
  //   setGeometry({})
  // }

  const handleMove = (e) => {
    if (!box) {
      return
    }

    if (!isDrawingRect) {
      return
    }
    const pos = e.target.getStage().getPointerPosition();

    setRectangles1([{
      ...geometry,
      width: pos.x - geometry.x,
      height: pos.y - geometry.y,
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
      <div className={classes.wrapper}>
        <Stage
          className={classes.wrapperForAnnotation}
          style={{ backgroundImage: `url(${img})` }}
          width={window.innerWidth}
          height={window.innerHeight - 100}
          onMouseDown={handleMouseDown}
          onMouseUp={handleEndCreateRectangle}
          onMouseMove={handleMove}
        >
          <Layer>
            {/* {(labelText) ? (
              labelText.map(label => (
                <LabelText
                  x={label.x}
                  y={label.y}
                  text={label.text}
                />
              ))
            ) : <></>} */}
            {innerOfDots.map(item => (
            <Line 
              points={item.points}
              stroke="#df4b26"
              fill='rgb(223,75,38,0.5)'
              strokeWidth={2}
              dash={[8, 5]}
              closed={true}
              lineCap="round"
              onClick={() => openForm(lines, 'dots')}
            />))}
            {lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke="#df4b26"
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
                stroke="#df4b26"
                fill="#df4b26"
                strokeWidth={1}
                draggable
                onMouseDown={handleFinishbox}
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
                  stroke="#df4b26"
                  fill="#df4b26"
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
              stroke="#df4b26"
              dash={[8, 5]}
              width={rectangles1[0] && rectangles1[0].width}
              height={rectangles1[0] && rectangles1[0].height}
              onFocus={() => { }}
              onBlur={() => { }}
            />
            {rectangles ? (
              rectangles.map(rect => (
                <Rect
                  x={rect.x}
                  y={rect.y}
                  stroke="#df4b26"
                  fill='rgb(223,75,38,0.5)'
                  width={rect.width}
                  height={rect.height}
                  draggabl
                  onClick={() => openForm(rectangles, 'box')}
                  dash={[8, 5]}
                  onFocus={() => { }}
                  onBlur={() => { }}
                />
              ))
            ) : null}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};


export default AnnotationImage;