import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  textEditor: {
    position: 'absolute',
    zIndex: 5,
  },
  textarea: {
    padding: '8px 16px',
    border: 0,
    fontSize: 14,
    margin: '6px 0',
    minHeight: 60,
    outline: 0,
  },
  button: {
    background: 'whitesmoke',
    border: 0,
    boxSizing: 'border-box',
    color: '#363636',
    cursor: 'pointer',
    fontSize: '1rem',
    margin: 0,
    marginTop: -10,
    outline: 0,
    padding: '8px 16px',
    textAlign: 'center',
    textShadow: '0 1px 0 rgba(0,0,0,0.1)',
    width: '100%',
    transition: 'background 0.21s ease-in-out',
    '&:focus, &:hover': {
      background: '#eeeeee',
    }
  }
}));

function TextEditor ({ left, top, onSubmit }) {
  const classes = useStyles();
  const [value, setValue] = React.useState('')

  return (
    <React.Fragment>
      <div className={classes.textEditor} style={{left: left, top: top}}>
        <textarea
          className={classes.textarea}
          placeholder='Write description'
          // onFocus={props.onFocus}
          // onBlur={props.onBlur}
          onChange={(e) => setValue(e.target.value)}
          value={value}
        >
        </textarea>
      
      {value && (
        <div
          className={classes.button}
          onClick={() => onSubmit(value)}
        >
          Submit
        </div>
      )}
      </div>
    </React.Fragment>
  )
}

export default TextEditor;