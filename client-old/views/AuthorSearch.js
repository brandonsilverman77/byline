import React, {Component} from "react";
import {createFragmentContainer, graphql, QueryRenderer} from 'react-relay';
import CreateFeedView from "Views/CreateFeedView";
import Environment from "../environment";
import AuthorList from "Views/AuthorList";
import CircularProgress from '@material-ui/core/CircularProgress';


class AuthorSearch extends Component {
  
  // shouldComponentUpdate(nextProps) {
  //   if (this.props.search !== nextProps.search && nextProps.search && nextProps.search.length > 2) {
  //     return true;
  //   }
  // 
  //   return false;
  // }
  
  render() {
    const {search, categories} = this.props;
    
    let categoryIds = Object.keys(categories).map(k => parseInt(k));
    
    if ((!search || search === "") && (!categoryIds || categoryIds.length < 1)) {
      return null;
    }
    
    
    return <QueryRenderer
      environment={Environment}
      query={graphql`
        query AuthorSearchQuery($search: String!, $categories: [Int!])  {
          app {
            authors(search: $search, categories: $categories) {
              ...AuthorList_authors
            }
            user {
              ...AuthorDetail_user
            }
            categories {
              ...AuthorDetail_categories
            }
          }
          
        }
      `}
      variables={{search: search, categories: categoryIds}}
      render={({error, props}) => {
        if (error) {
          return <div>Error!</div>;
        }
        if (!props) {
          return <CircularProgress />
        }
                
        return <AuthorList
          authors={props.app.authors} 
          user={props.app.user}
          params={{search, categories}}
          categories={props.app.categories}
          onSearch={this._handleSearch} />;
      }}
    />
  }
}

export default AuthorSearch;



