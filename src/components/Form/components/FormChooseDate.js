import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import ErrorIcon from '@material-ui/icons/Error';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../../../styles/formChooseDateStyle'

const useStyles = makeStyles(styles)

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