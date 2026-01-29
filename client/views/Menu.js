import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import HomeIcon from '@material-ui/icons/Home';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import PublicIcon from '@material-ui/icons/Public';
import SettingsIcon from '@material-ui/icons/Settings';
import {Link} from "react-router-dom";

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  
  link: {
    textDecoration: "none"
  },
  
  icon: {
    marginRight: "0px"
  }
};

class Menu extends React.Component {

  render() {
    const { classes, open, onClose, user } = this.props;

    return (
      <Drawer open={open} onClose={onClose} anchor='right'>
        <div
          tabIndex={0}
          role="button"
          onClick={onClose}
          onKeyDown={onClose}>
          <div className={classes.list}>
            <List>
              {user.superadmin ?
                <ListItem button component={Link} to="/admin">
                  <ListItemIcon className={classes.icon}><SettingsIcon /></ListItemIcon>
                  <ListItemText primary="Admin" />
                </ListItem> : null
              }
              <ListItem button onClick={() => {
                window.location = "/logout";
              }} href="/logout">
                <ListItemIcon className={classes.icon}><ThumbDownIcon /></ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
            {/*<Divider />*/}
          </div>
        </div>
      </Drawer>
    );
  }
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Menu);