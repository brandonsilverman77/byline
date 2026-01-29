import React from 'react';
import AddTwitterDialog from 'Views/AddTwitterDialog';
import { withStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import IconButton from '@material-ui/core/IconButton';
import AddOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import RemoveOutlinedIcon from '@material-ui/icons/RemoveCircleOutlined';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import classnames from 'classnames';
import PubSub, {Events} from 'Utilities/pub-sub';
import Strings from 'Utilities/strings';

const styles = theme => ({

  actions: {
    display: 'flex',
    justifyContent: 'flex-end'
  },

  removeIcon: {
    fontSize: 32,
    color: "gray",
  },
  addIcon: {
    fontSize: 32,
    color: theme.palette.secondary.main

  },
  expand: {
    transform: 'rotate(0deg)',

    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  
  subscribeButton: {
    boxShadow: 'none'
  }
});

export default withStyles(styles)((props) => {
  
  const {classes, author, user, categories, addCategory, subscribeToAuthor} = props;
  const {name, domains, objectId, subscribed} = author;
  
  let category = null;
    
  if (author.categoryIds.length > 0) {
    category = author.categoryIds[0];
  }
  
  return (
    <CardActions className={classes.actions}>
      <IconButton
      className={classnames(classes.expand, {
        [classes.expandOpen]: props.expanded,
      })}
      onClick={props.onExpand}
      aria-expanded={props.expanded}
      aria-label="Show more">
      <ExpandMoreIcon />
      </IconButton>
      <Button onClick={() => {
          if (user === null) {
            PubSub.trigger(Events.LOGIN_MODAL, {
              headline: `Login to Start Following ${Strings.cleanAuthorName(author.name)}`,
              subhead: 'Create an account with ByLine to begin receiving daily emails of your favorite writers.',
              callback: subscribeToAuthor
            })
          } else {
            subscribeToAuthor();
          }
        }} 
        className={classes.subscribeButton}
        variant={subscribed ? "outlined" : "contained"}
        size="small" 
        color={subscribed ? 'primary' : 'primary'}>
        {/*subscribed ? <RemoveOutlinedIcon className={classes.removeIcon} /> : <AddOutlinedIcon className={classes.addIcon} />*/}
        {subscribed ? "following" : "follow"}
      </Button>
      {/*
        user.superadmin ? <Select
          value={category || ""}
          onChange={(e) => {
            addCategory(e.target.value)
          }}>
          {categories.nodes.map(c => {
            return (
              <MenuItem key={c.objectId} value={c.objectId}>
                {c.label}
              </MenuItem>
            );
          })}
        </Select>
       : null
      */}
    </CardActions>
    
  )
});