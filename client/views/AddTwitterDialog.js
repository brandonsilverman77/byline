import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import {addTwitterAccountToAuthor} from 'Mutations/AddTwitterAccountToAuthorMutation';
import AddTwitterDialogView from 'Views/AddTwitterDialogView';
import { withSnackbar } from 'notistack';

class AddTwitterDialog extends Component {



  constructor(props) {
    super();
    
    this.state = {
      state: "ready",
      twitterUrlOrName: props.author.twitterHandle
    };
  }
  

  
  handleSubmit = () => {
    const {author, enqueueSnackbar} = this.props;
    const {twitterUrlOrName} = this.state;
        
    addTwitterAccountToAuthor(author.objectId, twitterUrlOrName, 
      () => {
        enqueueSnackbar(`Oops, something went wrong.`);
        this.setState({state: "ready"});
      },
      () => {
        this.setState({state: "success"});
        
        setTimeout(() => {
          this.setState({state: "ready"});
          this.handleClose();
        }) 
        enqueueSnackbar(`Updated ${author.name} with twitter handle ${twitterUrlOrName}`);
    });
    
    this.setState({state: "submitting"});

  }
  
  handleClose = () => {
    this.props.onClose();
  };

  render() {
    return <AddTwitterDialogView 
      author={this.props.author}
      state={this.state.state}
      twitterUrlOrName={this.state.twitterUrlOrName}
      onClose={this.handleClose}
      onUpdate={(val) => {
        this.setState({twitterUrlOrName: val})
      }}
      onSubmit={this.handleSubmit}
      open={this.props.open} />;
  }
}

export default withSnackbar(AddTwitterDialog);