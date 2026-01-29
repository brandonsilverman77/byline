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

  
  requestAnAuthor: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20
  },
  
  requestAnAuthorText: {
    marginBottom: 10 
  }
  
});

class RequestAnAuthorDialogView extends Component {


  constructor(props) {
    super();

  }
  
  render() {
    const {authorName, classes, onUpdate, open, onSubmit, onOpen, onClose, state} = this.props;
    
    return (
      <div className={classes.requestAnAuthor}>  
        <Typography fontWeight={600} className={classes.requestAnAuthorText}>Not seeing someone?</Typography>
        <Button onClick={onOpen} variant="contained" color='black'>Request An Author</Button>
        <Dialog
          open={open}
          fullWidth
          maxWidth="sm"
          onClose={onClose}
          className={classes.dialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">Request An Author</DialogTitle>
          <DialogContent>
            <TextField
              value={authorName}
              onChange={(e) => {
                onUpdate(e.target.value)
              }}
              autoFocus
              margin="dense"
              label="Name"
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
              loadingText="Requesting"
              disabled={!authorName}
              onClick={() => {
                onSubmit();
              }}>
                Save
            </LoadingButton>
          </DialogActions>
        </Dialog>
      </div> 
    )
  }
}

export default withStyles(styles)(RequestAnAuthorDialogView);