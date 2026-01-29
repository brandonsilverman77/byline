import { withStyles } from '@material-ui/core/styles';
import React, {PureComponent} from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import Menu from "Views/Menu";
import LoginDialog from "Views/LoginDialog";
import {Link} from 'react-router-dom';
import Logo from 'Views/Logo';

const styles = theme => ({
  
  nav: {
    // background: theme.palette.primary,
    background: 'white',
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.palette.gray.light}`,

  },
  
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    boxShadow: 'none'
  },
  
  menuButtonWrapper: {
    width: 200,
    display: "flex"
  },
  
  login: {
    width: 200,
    display: 'flex',
    flexDirection: 'row-reverse'
  },
  
  logo: {
    width: 100,
    margin: 0
  },
  
  aboutLink: {
    textTransform: 'none',
    fontWeight: 'normal'
  }
});

class Nav extends PureComponent {
  
  constructor() {
    super();

    this.login = React.createRef();
  }

  
  render() {
    const {classes, user} = this.props;
    
    console.log(user);
    
    return (
      <AppBar className={classes.nav} position="fixed">
        <Toolbar className={classes.toolbar}>
          <div className={classes.menuButtonWrapper}>
            <Button className={classes.aboutLink} component={Link} to="/about">About</Button>
          </div>
          {this.props.hasFilter ? <Logo className={classes.logo} /> : null}

          <LoginDialog ref={this.login} className={classes.login} user={this.props.user} />
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(Nav);

/**
<IconButton onClick={() => {
  this.setState({menuOpen: true})
}} className={classes.menuButton} color="black" aria-label="Menu">
  <MenuIcon />
</IconButton>

<ListItem button component={Link} to="/about">
  <ListItemIcon className={classes.icon}><PublicIcon /></ListItemIcon>
  <ListItemText primary="About" />
</ListItem>
*/
  
