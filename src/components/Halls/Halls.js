import React from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  hallsCard: {
    height: '100%',
  },
  hallsAddButton: {
    textTransform: 'uppercase',
    marginBottom: 39
  }, 
  hallsListItem: {
    background: '#E9F4FF',
    borderRadius: 5,
    marginTop: 10
  }, 
  hallsTitle: {
    fontSize: 18,
    textTransform: 'uppercase',
    color: '#1B1F36',
    lineHeight: '16px',
    letterSpacing: '0.028px',
  }
}));

function Halls({ annotations, addAnnoatation, currentId }) {
  const classes = useStyles();

  return (
    <Card className={classes.hallsCard}>
      <CardContent >
        <Grid container justify='center'>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            className={classes.hallsAddButton}
            onClick={() => addAnnoatation()}
          >
            add new hall
          </Button>
        </Grid>
        <Typography className={classes.hallsTitle}>
            Exhibitions Halls
          </Typography>
        <List>
          {annotations.map((item, i) => {
            return (
            <ListItem className={classes.hallsListItem}>
              <ListItemText
                primary={item.formValues.name}
              />
              <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="edit" color='inherit'>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" color='secondary'>
                      <DeleteIcon />
                    </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )})}
        </List>
      </CardContent>
    </Card>
  );
}

export default Halls;