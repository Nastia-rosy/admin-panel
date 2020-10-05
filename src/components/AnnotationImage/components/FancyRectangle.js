import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  box: {
    background: 'rgba(0, 0, 0, 0.2)',
    position: 'absolute',
  },
  container: {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  }
}));

function FancyRectangle ({geometry}) {
  const classes = useStyles();

  if (!geometry) return null

  return (
    <div
      className={classes.container}
    >
      <div
        className={classes.box}
        style={{
          top: 0,
          left: 0,
          height: `${geometry.y}px`,
          width: '100%'
        }}
      />
      <div
        className={classes.box}
        style={{
          left: 0,
          top: `${geometry.y}px`,
          height: `${geometry.height}px`,
          width: `${geometry.x}px`
        }}
      />
      <div
        className={classes.box}
        style={{
          top: `${geometry.y}px`,
          right: 0,
          left: `${geometry.x + geometry.width}px`,
          height: `${geometry.height}px`,
          width: `${100 - (geometry.x + geometry.width)}px`
        }}
      />
      <div
        className={classes.box}
        style={{
          top: `${geometry.y + geometry.height}px`,
          // height: `${100% - (geometry.y + geometry.height)}px`,
          width: '100%',
          left: 0,
          right: 0,
          bottom: 0
        }}
      />
    </div>
  )
}

export default FancyRectangle