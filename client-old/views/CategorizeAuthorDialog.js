import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import {createAuthorCategory} from 'Mutations/CreateAuthorCategoryMutation';
import CategorizeAuthorDialogView from 'Views/CategorizeAuthorDialogView';
import { withSnackbar } from 'notistack';
import {graphql, createFragmentContainer} from 'react-relay';

class CategorizeAuthorDialog extends Component {
  constructor(props) {
    super();
    
    this.state = {
      state: "ready"
    };
  }
  

  
  handleSubmit = (categoryIds) => {
    const {author, enqueueSnackbar} = this.props;
        
    createAuthorCategory(author.objectId, categoryIds, 
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
        enqueueSnackbar(`Updated categories for ${author.name}!`);
    });
    
    this.setState({state: "submitting"});

  }
  
  handleClose = () => {
    this.props.onClose();
  };

  render() {
    return <CategorizeAuthorDialogView 
      author={this.props.author}
      categories={this.props.categories}
      state={this.state.state}
      onClose={this.handleClose}
      onSubmit={this.handleSubmit}
      open={this.props.open} />;
  }
}



export default createFragmentContainer(withSnackbar(CategorizeAuthorDialog), {
  categories: graphql`
    fragment CategorizeAuthorDialog_categories on CategoryConnection {
      nodes {
        id
        objectId
        label
      }
    }
  `
});
