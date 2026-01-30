import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {login} from 'Mutations/LoginMutation';
import PersonIcon from '@material-ui/icons/Person';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import LoadingButton from "UI/LoadingButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const styles = theme => ({
  personIcon: {
    color: "white"
  },
  
  userEmail: {
    color: "white"
  },
  
  userInfo: {
    display: 'flex',
    alignItems: 'center'
  },
  
  dialog: {
    minWidth: 300
  },

  twitterIconAdded: {
    color: "#00aced"
  }
  
});

class AddTwitterDialogView extends Component {


  constructor(props) {
    super();

  }
  
  render() {
    const {author, twitterUrlOrName, classes, onUpdate, open, onSubmit, onOpen, onClose, state} = this.props;
    
    return <Dialog
        open={open}
        fullWidth
        maxWidth="sm"
        onClose={onClose}
        className={classes.dialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Add Twitter Handle</DialogTitle>
        <DialogContent>
          <TextField
            value={twitterUrlOrName}
            onChange={(e) => {
              onUpdate(e.target.value)
            }}
            autoFocus
            margin="dense"
            label="Twitter handle or url"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <LoadingButton 
            state={state}
            loadingText="Fetching from twitter..."
            disabled={!twitterUrlOrName}
            onClick={() => {
              onSubmit();
            }}>
              Save
          </LoadingButton>
        </DialogActions>
      </Dialog>
  }
}

export default withStyles(styles)(AddTwitterDialogView);