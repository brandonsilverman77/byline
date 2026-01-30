import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import {login} from 'Mutations/LoginMutation';
import LoginDialogView from 'Views/LoginDialogView';
import {QueryRenderer} from 'react-relay';
import CircularProgress from '@material-ui/core/CircularProgress';
import {createFragmentContainer, graphql} from 'react-relay';
import PubSub, {Events} from 'Utilities/pub-sub';

const defaultState = {
  headline: 'Login To ByLine',
  subhead: '',
  callback: null
}

class LoginDialog extends Component {

  state = {
    open: false,
    state: "ready",
    error: null,
    headline: defaultState.headline,
    subhead: defaultState.subhead,
    callback: null
  };
  


  constructor(props) {
    super();
    
  }
  
  componentDidMount() {
    console.log("mounting and subscribing");
    this.unsub = PubSub.subscribe(Events.LOGIN_MODAL, this.open)
  }
  
  componentWillUnmount() {
    this.unsub();
  }
  
  open = (settings) => {
    this.setState({open: true, ...settings});
  }

  handleClickOpen = () => {
    this.setState({open: true, ...defaultState});
  };

  handleLogin = ({email, password}) => {
    login(email, password, () => {
      this.setState({state: "success"});
      
      setTimeout(() => {
        this.setState({state: "ready", open: false, error: null});
        if (this.state.callback) {
          this.state.callback();
        }
      }) 
    }, (err) => {
      this.setState({state: "ready", error: err});
    });
    
    this.setState({state: "submitting"});
  };
  
  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return <LoginDialogView 
      headline={this.state.headline}
      subhead={this.state.subhead}
      className={this.props.className}
      state={this.state.state}
      error={this.state.error}
      onOpen={this.handleClickOpen}
      onClose={this.handleClose}
      onLogin={this.handleLogin}
      open={this.state.open} 
      user={this.props.user} />;
  }
}

export default createFragmentContainer(LoginDialog, 
  {
  user: graphql`
    fragment LoginDialog_user on User {
      id
      email
      superadmin
      objectId
    }`
  }
);