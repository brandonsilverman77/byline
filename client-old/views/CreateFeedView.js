import React, {PureComponent} from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import {createFeed} from "Mutations/CreateFeedMutation";
import { withSnackbar } from 'notistack';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  
  textField: {
    width: "100%"
  }
});

class CreateFeedView extends PureComponent {
  
  constructor() {
    super();
    this.state = {
      url: ""
    }
  }
  
  _handleSubmit() {
    const {enqueueSnackbar} = this.props;
    createFeed(
      this.state.url,
      () => {
        enqueueSnackbar("Added!");
      }
    );
  }
  
  render() {
    const { classes, feed } = this.props;
    
    console.log(this.props); 
    

    
    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <h1>Add a feed to the system</h1>
          <Paper className={classes.paper}>
            <TextField 
              value={this.state.url}
              onChange={(e) => this.setState({url: e.target.value})} 
              className={classes.textField} 
              placeholder="Enter a feed" />
            <Button
              onClick={() => {
                this._handleSubmit();
              }}
            >Save</Button>
          </Paper>
        </Grid>
        <Grid item xs={12}>
  
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(withSnackbar(CreateFeedView));
