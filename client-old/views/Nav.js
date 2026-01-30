import { withStyles } from '@material-ui/core/styles';
import React, { PureComponent } from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import LoginDialog from "Views/LoginDialog";
import { Link } from 'react-router-dom';

const styles = theme => ({
  nav: {
    background: 'transparent',
    boxShadow: 'none',
    transition: 'background 0.3s ease',
  },

  navScrolled: {
    background: 'rgba(10, 10, 10, 0.95)',
    backdropFilter: 'blur(10px)',
  },

  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    boxShadow: 'none',
    padding: '1rem 2rem',
    
    [theme.breakpoints.up('md')]: {
      padding: '1.5rem 4rem',
    },
  },

  logoWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  logo: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.75rem',
    fontWeight: 700,
    color: '#FFFFFF',
    textDecoration: 'none',
    letterSpacing: '-0.02em',
    
    '&:hover': {
      opacity: 0.8,
    },
  },

  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
    
    [theme.breakpoints.down('sm')]: {
      gap: '1rem',
    },
  },

  navLink: {
    color: '#FFFFFF',
    textDecoration: 'none',
    fontWeight: 500,
    fontSize: '0.9rem',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    opacity: 0.8,
    transition: 'opacity 0.3s',
    
    '&:hover': {
      opacity: 1,
    },
    
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },

  loginWrapper: {
    display: 'flex',
    alignItems: 'center',
    
    '& button': {
      color: '#FFFFFF',
      borderColor: 'rgba(255,255,255,0.3)',
      
      '&:hover': {
        borderColor: '#D4A012',
        color: '#D4A012',
      },
    },
  },

  getStartedBtn: {
    backgroundColor: '#D4A012 !important',
    color: '#0A0A0A !important',
    padding: '0.6rem 1.5rem !important',
    fontWeight: '600 !important',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    fontSize: '0.85rem !important',
    marginLeft: '1rem !important',
    
    '&:hover': {
      backgroundColor: '#FFCC00 !important',
    },
    
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
});

class Nav extends PureComponent {
  constructor() {
    super();
    this.login = React.createRef();
    this.state = {
      scrolled: false,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const scrolled = window.scrollY > 50;
    if (scrolled !== this.state.scrolled) {
      this.setState({ scrolled });
    }
  };

  render() {
    const { classes, user } = this.props;
    const { scrolled } = this.state;

    return (
      <AppBar 
        className={`${classes.nav} ${scrolled ? classes.navScrolled : ''}`} 
        position="fixed"
      >
        <Toolbar className={classes.toolbar}>
          <div className={classes.logoWrapper}>
            <Link to="/" className={classes.logo}>
              Byline
            </Link>
          </div>

          <div className={classes.navLinks}>
            <Link to="/about" className={classes.navLink}>
              About
            </Link>
            <div className={classes.loginWrapper}>
              <LoginDialog ref={this.login} user={user} />
            </div>
            <Button 
              variant="contained" 
              className={classes.getStartedBtn}
              onClick={() => {
                const searchSection = document.getElementById('search-section');
                if (searchSection) {
                  searchSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Get Started
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Nav);
