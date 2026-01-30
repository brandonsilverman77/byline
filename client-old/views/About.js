import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({

    container: {
      // height: '100%',
      paddingTop: 50,
      paddingLeft: 40,
      paddingRight: 40,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }

});

export default withStyles(styles)((props) => {
  const {classes} = props;
  
  props.setHasFilter();
  
  return (
    <Grid className={classes.container}>
      <Typography>ByLine is a simple idea...follow authors that you like to read and get a single, daily email with any articles they've written that day. That's it. Enjoy!</Typography>
      <br />
      <iframe src="https://giphy.com/embed/WoWm8YzFQJg5i" width="480" height="351" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
      <br />
      <Typography><strong>A joint by Brandon and George</strong></Typography>
    </Grid>
  )
});