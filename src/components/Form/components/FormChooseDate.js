import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import ErrorIcon from '@material-ui/icons/Error';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formChooseTime: {
    display: 'flex',
    alignItems: 'center'
  },
  formDate: {
    margin: '5px 0 24px',
    padding: '25px 0',
    borderTop: '1px solid #E3E3E3',
    borderBottom: '1px solid #E3E3E3',
  },
  formTime: {
    color: '#1B1F36',
  },
  formTimeField: {
    width: 78,
    lineHeight: 40,
    margin: '0 9px 5px'
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
  labelDate: {
    margin: 0,
  }
}));

function FormChooseDate() {
  const classes = useStyles();

  return (
    <Grid container className={classes.formDate}>
      <FormControl component="fieldset" fullWidth>
        <FormLabel component="legend" className={classes.formLegend}>
          Working dates
            <ErrorIcon className={classes.formErrorIcon} />
        </FormLabel>
      </FormControl>

      <FormLabel component="legend" className={classes.formLegend}>
        Working hours
      </FormLabel>

      <Grid container justify='space-between'>
        <Grid container item xs={7} md={7} lg={7} className={classes.formChooseTime}>
          <Grid xs={4} item md={2}>
            <FormLabel component="legend" className={classes.formTime}>
            From
        </FormLabel>
          </Grid>
          <Grid item xs={8} md={5}>
            <TextField
            id="time"
            variant="outlined"
            size='small'
            defaultValue="09:00"
            className={classes.formTimeField}
          />
          </Grid>
          <Grid item xs={4} md={1}>
            <FormLabel component="legend" className={classes.formTime}>
            To
            </FormLabel>
          </Grid>
          <Grid item xs={8} md={4}>
            <TextField
            id="time"
            size='small'
            variant="outlined"
            defaultValue="18:00"
            className={classes.formTimeField}
          />
          </Grid>
        </Grid>
        <Grid item>
          <FormControlLabel className={classes.labelDate} label="Closed today" control={<Checkbox />} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default FormChooseDate;