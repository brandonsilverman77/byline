import React from "react";
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import AuthorDetailSimple from 'Views/AuthorDetailSimple'
import AuthorDetailComplex from 'Views/AuthorDetailComplex'

const styles = theme => ({
  container: {
    maxWidth: 600,
    marginBottom: 0,
    marginLeft: 10,
    marginRight: 10,
    width: "100%",
    boxShadow: 'none',
    paddingBottom: 0,
    [theme.breakpoints.down('xs')]: {
      marginBottom: 10,
    },
    // borderBottom: '1px solid #ccc'
  }

});


export default withStyles(styles)((props) => {
  const {classes, author, categories} = props;
  const {twitterId} = author;
  
  console.log(classes);
  
  let actionProps = Object.assign({}, props);
  delete actionProps.classes;

  return (
    <Card className={classes.container}>
      <AuthorDetailComplex 
        actionProps={actionProps} 
        author={author} 
        categories={categories} />
    </Card>
  )
})