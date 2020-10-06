import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import CardActions from '@material-ui/core/CardActions';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormHeader from './components/FormHeader';
import FormButtons from './components/FormButtons';
import FormChooseDate from './components/FormChooseDate';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  form: {
    position: 'relative',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  formLegend: {
    marginBottom: 10,
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 16,
    color: '#1B1F36',
  },
  formErrorIcon: {
    width: 16,
    height: 16,
    color: 'rgba(0, 0, 0, 0.3)',
    lineHeight: '19px',
    transform: 'translate(25%, 25%), rotate(180deg)'
  },
  formSaveButton: {
    background: '#4CAF50',
    color: '#fff'
  },
  formButton: {
    textTransform: 'uppercase',
  },
  formSaveButtonWrapper: {
    marginBottom: '10px'
  }
}));

function EditForm({ handleSaveForm, uploadNewImage, currentAnnotation={}, handleCloseForm, setAnnotationColor }) {
  const classes = useStyles();
  const [isChecked, setIsChecked] = useState(null) 
  const [hallName, setHallName] = useState('')
  const [color, setColor] = useState('')

  const handleChooseColor = (e) => {
    setColor(e.target.value);
    setAnnotationColor(e.target.value)
  };
  
  const handleIsChecked = (e) => {
    console.log(e.target.value);
    setIsChecked(e.target.value === 'box' ? true : false)
  }

  useEffect(() => {
    if (!currentAnnotation[0]) {
      return
    }
    const type = currentAnnotation[0].type;
    const checked = (type === 'box') ? true : false;
    const name = currentAnnotation[0].formValues.name;
    const color = currentAnnotation[0].color.name
    setHallName(name)
    setIsChecked(checked)
    setColor(color)
  }, [currentAnnotation]);

  const handleSaveButton = () => {
      handleSaveForm({
        ...currentAnnotation[0],
        formValues: {
          name: `${hallName}`,
          type: isChecked === 'box' ? 'dots' : 'dots'
        }
        
      }, 'exist')
  }

  const handleHallName = (e) => {
    setHallName(e.target.value)
  }
  
  return (
    <Card className={classes.form}>
      <div>
      <FormHeader handleCloseForm={handleCloseForm} />
      <CardContent>
        <FormButtons uploadNewImage={uploadNewImage} />
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend" className={classes.formLegend}>
            Hall name
          </FormLabel>
          <OutlinedInput 
            value={hallName}
            placeholder='Eco Hall'
            className={classes.formInput}
            onChange={handleHallName}
          />
        </FormControl>

        <FormControlLabel label="Conference Hall" control={<Checkbox />} />
        <FormControlLabel label="Check-in Zone" control={<Checkbox />} />
        <FormChooseDate />
        <FormLabel component="legend" className={classes.formLegend}>
          Mark hall on the floor plan
        </FormLabel>
        <Grid container justify="space-between">
          <Grid item md={6}>
            <FormControl component="fieldset">
          <RadioGroup aria-label="hall">
            <FormControlLabel value="box" label="Box" control={
                <Radio checked={isChecked} onChange={handleIsChecked} />
              }/>
            <FormControlLabel value="dots" label="Dots" control={
                <Radio 
                  checked={(!isChecked && !(isChecked === null)) ? !isChecked : false}
                  onChange={handleIsChecked}
                />
              }/>
          </RadioGroup>
        </FormControl>
          </Grid>
          
          <Grid item md={6}>
            <FormControl variant="outlined" className={classes.formControl} fullWidth size='small'>
        {/* <InputLabel id="demo-simple-select-outlined-label">Color</InputLabel> */}
        <Select
          value={color}
          displayEmpty
          // inputProps={{ 'aria-label': 'Without label' }}
          onChange={handleChooseColor}
        >
          <MenuItem value="" disabled>
            Color:
          </MenuItem>
          <MenuItem value={'White'}>White</MenuItem>
          <MenuItem value={'Red'}>Red</MenuItem>
          <MenuItem value={'Yellow'}>Yellow</MenuItem>
          <MenuItem value={'Blue'}>Blue</MenuItem>
        </Select>
      </FormControl>
          </Grid>
        
        </Grid>
        
      </CardContent>
      </div>
      <CardActions className={classes.formSaveButtonWrapper}>
        <Grid container justify='center'>
          <Button 
            variant="contained" 
            className={classes.formSaveButton} 
            onClick={handleSaveButton}
          >
            Save
        </Button>
        </Grid>
      </CardActions>
    </Card>
  );
}

export default EditForm;