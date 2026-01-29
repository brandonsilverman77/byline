import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import {requestAnAuthor} from 'Mutations/RequestAnAuthorMutation';
import RequestAnAuthorDialogView from 'Views/RequestAnAuthorDialogView';
import { withSnackbar } from 'notistack';

class RequestAnAuthor extends Component {



  constructor(props) {
    super();
    
    this.state = {
      state: "ready",
      authorName: "",
      open: false
    };
  }
  

  
  handleSubmit = () => {
    const {enqueueSnackbar} = this.props;
    const {authorName} = this.state;
        
    requestAnAuthor(authorName, 
      () => {
        this.setState({state: "success"});
        
        setTimeout(() => {
          this.setState({state: "ready", open: false});
          this.handleClose();
        }, 3000) 
        enqueueSnackbar(`${authorName} Requested!`);
    },
    () => {
      enqueueSnackbar(`Oops, something went wrong.`);
      this.setState({state: "ready"});
    },
  );
    
    this.setState({state: "submitting"});

  }
  
  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    return <RequestAnAuthorDialogView 
      state={this.state.state}
      authorName={this.state.authorName}
      onClose={this.handleClose}
      onUpdate={(val) => {
        this.setState({authorName: val})
      }}
      onOpen={() => {
        this.setState({open: true});
      }}
      onSubmit={this.handleSubmit}
      open={this.state.open} />;
  }
}

export default withSnackbar(RequestAnAuthor);