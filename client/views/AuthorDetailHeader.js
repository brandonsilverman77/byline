import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import CardHeader from '@material-ui/core/CardHeader';
import Menu from '@material-ui/core/Menu';
import StarIcon from '@material-ui/icons/Star';
import CategoryIcon from '@material-ui/icons/Category';
import StarOutlinedIcon from '@material-ui/icons/StarOutlined';
import MenuItem from '@material-ui/core/MenuItem';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import {featureAuthor} from 'Mutations/FeatureAuthorMutation';
import { withSnackbar } from 'notistack';
import AuthorDetailActions from 'Views/AuthorDetailActions';
import Strings from 'Utilities/strings';

const styles = theme => ({

  avatar: {
    background: theme.palette.primary,
    color: "white",
    [theme.breakpoints.down('xs')]: {
      marginRight: 5
    },
    
    // width: 60,
    // height: 60,
  },

  
  subHeader: {
    // lineHeight: "14px"
  },
  
  header: {
    // fontSize: 20,
    fontWeight: "bold",
    
  },
  headerContent: {
    alignItems: 'flex-start',
    [theme.breakpoints.down('xs')]: {
      padding: 5
    },
  },
  
  container: {
    display: 'flex',
    justifyContent: 'space-between',
  

  }

});

class AuthorDetailHeader extends Component {

  toggleFeatured = () => {
    this.setState({ anchorEl: null });
    const {author, enqueueSnackbar} = this.props;
    featureAuthor(author.objectId, () => {
      enqueueSnackbar(`Oops, something when wrong featuring ${author.name}.`);
    }, () => {
      if (author.featured) {
        enqueueSnackbar(`${author.name} no longer featured.`);
      } else {
        enqueueSnackbar(`${author.name} featured!`);
      }
      
    })
  }
  
  render() {
    const {author, classes, categories, actionProps, onExpand} = this.props;
    const {name, domains} = author;
    


    
    let subHeader = (
      <span className={classes.subHeader}>
        {domains.nodes.map(d => d.host).join(", ")}
      </span>
    );
    
    let header = (
      <Typography className={classes.header}>
        {Strings.cleanAuthorName(author.name)}
      </Typography>
    );
    
    return (
      <div className={classes.container}>

        <CardHeader
          avatar={
            <Avatar 
              className={classes.avatar}
              src={author.imageUrl}
              aria-label={author.name}>{
                author.imageUrl ? 
                  null
                  : author.name.slice(0, 1).toUpperCase()
              }
              </Avatar>
            }
          className={classes.headerContent}
          title={header}
          subheader={subHeader} />
          <AuthorDetailActions {...actionProps} 
            onExpand={onExpand} 
            expanded={this.props.expanded} />
          
        </div>
      );
  }
}

export default withStyles(styles)(withSnackbar(AuthorDetailHeader));