import React from 'react';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';

import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import AuthorDetailHeader from 'Views/AuthorDetailHeader';

const styles = theme => ({
  container: {
    // background: theme.palette.primary.main,
    padding: 0
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    background: theme.palette.primary.main,
    color: "white"
  }

});


export default withStyles(styles)((props) => {
  const {author, classes} = props;
  const {name, domains} = author;
  
  let headerProps = Object.assign({}, props);
  delete headerProps.classes;
  
  return (
    <CardContent className={classes.container}>
      <AuthorDetailHeader {...headerProps} />
    </CardContent>
  )
})