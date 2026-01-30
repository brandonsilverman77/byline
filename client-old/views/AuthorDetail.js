import React, {PureComponent} from "react";
import {createFragmentContainer, graphql} from 'react-relay';
import AuthorDetailView from 'Views/AuthorDetailView';
import {createAuthorCategory} from "Mutations/CreateAuthorCategoryMutation";
import {addTwitterAccountToAuthor} from "Mutations/AddTwitterAccountToAuthorMutation";
import { withSnackbar } from 'notistack';
import {subscribeToAuthor} from 'Mutations/SubscribeToAuthorMutation';


class AuthorDetail extends PureComponent {
  
  addCategory = (categoryId) => {
    const {author, enqueueSnackbar, categories} = this.props;
    
    const category = categories.nodes.filter(c => c.objectId === categoryId)[0];
    
    createAuthorCategory(author.objectId, categoryId, 
    () => {
      enqueueSnackbar(`Oops, something went wrong.`);
    },
    () => {
      enqueueSnackbar(`Updated ${author.name} to ${category.label}`);
    });
  }
  
  subscribeToAuthor = () => {
    const {author, enqueueSnackbar} = this.props;
        
    subscribeToAuthor(author.objectId, 
    () => {
      enqueueSnackbar(`Oops, something went wrong.`);
    },
    () => {
      if (author.subscribed) {
        enqueueSnackbar(`You've removed ${author.name} to your list.`);
      } else {
        enqueueSnackbar(`You've added ${author.name} to your list!`);
      }
    
    });
  }
  
  
  render() {
    
    return <AuthorDetailView {...this.props}
      addCategory={this.addCategory}
      subscribeToAuthor={this.subscribeToAuthor} />;
  }
}

export default createFragmentContainer(withSnackbar(AuthorDetail), {
  // For each of the props that depend on server data, we define a corresponding
  // key in this object. Here, the component expects server data to populate the
  // `item` prop, so we'll specify the fragment from above at the `item` key.
  author: graphql`
    fragment AuthorDetail_author on Author {
      id 
      name
      objectId
      categoryIds
      subscribed
      twitterHandle
      imageUrl
      twitterId
      featured
      twitterProfileImageUrl
      bio
      domains {
        nodes {
          id
          host
        }
      }
    }`,
  user: graphql`fragment AuthorDetail_user on User {
    id
    superadmin
  }`,
  categories: graphql`fragment AuthorDetail_categories on CategoryConnection {
    ...CategoryChipList_categories
    ...CategorizeAuthorDialog_categories
  }`

});

