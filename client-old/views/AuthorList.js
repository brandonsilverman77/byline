import React from "react";
import AuthorDetail from "Views/AuthorDetail";
import {createFragmentContainer, graphql} from 'react-relay';
import { withStyles } from '@material-ui/core/styles';
import GridList from "@material-ui/core/GridList"
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import RequestAnAuthorDialog from 'Views/RequestAnAuthorDialog';

const styles = theme => ({
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    // width: '80%',
    flexWrap: 'wrap',
    maxWidth: 1000,
    justifyContent: 'center'
    
  },
  
  noResults: {
    fontSize: 25,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  
  noResultsText: {
    fontSize: 25,
    maxWidth: 450,
    textAlign: "center"
  },
  

  
});

const AuthorList = (props) => {
  
  const {authors, params, classes, user, categories} = props;
  
  console.log(params, Object.keys(params.categories).length);
  let content = null;
    
  if (authors.nodes.length < 1) {
    content = (
      <div className={classes.noResults}>
        <SearchIcon style={{fontSize: "60px"}} color='secondary' />
        <Typography fontWeight={600} className={classes.noResultsText}>Oh no! Nothing found for '{params.search}'. Want to try something else?</Typography>
      </div>
    );
  } else {
    content = authors.nodes.map(a => <AuthorDetail user={user} key={a.id} author={a} categories={categories} />);

  }
    
  return (
    <React.Fragment>
      <div className={classes.container}>
        {content}       
      </div>
      {
        params.search ?
        <RequestAnAuthorDialog />
        : null
      }
    </React.Fragment>
  ) 
}


export default createFragmentContainer(withStyles(styles)(AuthorList), {
  // For each of the props that depend on server data, we define a corresponding
  // key in this object. Here, the component expects server data to populate the
  // `item` prop, so we'll specify the fragment from above at the `item` key.
  authors: graphql`
    fragment AuthorList_authors on AuthorConnection {
      nodes {
        id
        ...AuthorDetail_author
      }
    }
  `
});