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
import Menu from 'Views/Menu';
const styles = theme => ({

  
  userEmail: {
    // color: theme.palette.primary.main
    color: 'black',
    marginRight: 10,
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    },
  },
  
  userInfo: {
    display: 'flex',
    alignItems: 'center'
  },
  
  getStartedButton: {
    boxShadow: 'none',
    [theme.breakpoints.down('xs')]: {
      fontSize: 11,
      padding: 5
    },
    
  },
  
  loginButton: {
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    },
  }
  
});

class LoginDialogView extends Component {

  state = {
    email: '',
    password: '',
    menuOpen: false
  };

  constructor(props) {
    super();
    
    this.emailInput = React.createRef();
    this.passwordInput = React.createRef();
    
    
  }
  
  render() {
    const {email, password, menuOpen} = this.state;
    const {user, error, classes, open, onLogin, onOpen, onClose, state, className} = this.props;

    return (
      <div className={className}>
      {
        !user ? 
        <React.Fragment>
          <Button className={classes.loginButton} onClick={onOpen} color="primary">Login</Button>
          <Button className={classes.getStartedButton} onClick={onOpen} color="primary" variant='contained'>Get Started</Button>
        </React.Fragment>
        : <div className={classes.userInfo}>
            <Typography className={classes.userEmail}>
              {user.email}
            </Typography> 
            <IconButton color="black" aria-label="user" onClick={() => {
              this.setState({menuOpen: true})
            }}>
              <PersonIcon className={classes.personIcon} />
            </IconButton>
            <Menu user={user} open={menuOpen} onClose={() => {
              this.setState({menuOpen: false});
            }} />
          </div>
      }
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {this.props.headline}
        </DialogTitle>
      
        <DialogContent>
          <DialogContentText>
            {this.props.subhead}
          </DialogContentText>
          <TextField
            value={email}
            onChange={(e) => {
              this.setState({email: e.target.value})
            }}
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
          />
          <TextField
            value={password}
            onChange={(e) => {
              this.setState({password: e.target.value})
            }}
            error={!!error}
            helperText={error}
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <LoadingButton 
            state={state}
            loadingText="Logging in..."
            disabled={!password || !email}
            onClick={() => {
              onLogin({email, password});
            }}>
              Login
          </LoadingButton>
        </DialogActions>
      </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(LoginDialogView);