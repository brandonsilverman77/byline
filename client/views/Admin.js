import React, {PureComponent} from "react";
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import validator from 'validator';
import { withSnackbar } from 'notistack';
import HourGlass from '@material-ui/icons/HourglassEmpty';
import classnames from "classnames";
import {createFeed} from "Mutations/CreateFeedMutation";
import LoadingButton from "UI/LoadingButton";

const styles = theme => ({
  textField: {
    width: "80%"
  },
  container: {
    display: 'flex',
    flexDirection: "column",
    margin: 'auto',
    maxWidth: '800px',
    marginTop: "100px",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px"
  },

  wrapper: {
    margin: 'auto',
    width: '100px',
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
  },
  
  buttonCustom: {
    alignSelf: 'flex-end',
    marginRight: '10%'
  },

});

class Admin extends PureComponent {
  
  constructor(props) {
    super();
    
    this.state = {
      url: "",
      valid: true,
      error: null,
      state: "ready",
    }
    
    props.setHasFilter();
  }
  
  _handleSubmit = () => {
    const {enqueueSnackbar} = this.props;
    const {url} = this.state;
    createFeed(
      url,
      () => {
        enqueueSnackbar(`Added ${url}`, {varient: "warning"});
        this.setState({state: "success"});
        setTimeout(() => {
          this.setState({state: "ready", url: ""});
        }, 2500);
      }, 
      (err) => {
        enqueueSnackbar(err);
        this.setState({
          valid: false,
          state: "error",
          error: "Try Again"
        })
      }
    );
    
    this.setState({state: "submitting"});
  }
  
  render() {
    const {url, valid, error, state} = this.state;
    const {classes} = this.props;
    
    let label = "RSS Feed";
    
    if (!valid) {
      label = error;
    }
    
    return (
      <Grid>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="outlined-name"
          label={label}
          className={classes.textField}
          value={url}
          onChange={(e) => {
            const val = e.target.value;
            let valid = true; 
            console.log(val);
            if (val && val !== "") {
              valid = validator.isURL(val);
            }
            const newState = {};
            newState.url = val;
            newState.valid = valid;
            if (!valid) {
              newState.error = "This is not a valid URL"
            }
            
            this.setState(newState);
          }}
          margin="normal"
          variant="outlined"
        />
        <LoadingButton 
          className={classes.buttonCustom}
          state={state}
          disabled={!valid || !url}
          onClick={this._handleSubmit}>
            Save
        </LoadingButton>

      </form>

      </Grid>
    )
  }
}

export default withStyles(styles)(withSnackbar(Admin));