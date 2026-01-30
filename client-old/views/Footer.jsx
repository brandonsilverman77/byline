import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const styles = theme => ({
  footer: {
    padding: '3rem 2rem',
    backgroundColor: '#1A1A1A',
    borderTop: '1px solid rgba(255,255,255,0.05)',
    
    [theme.breakpoints.up('md')]: {
      padding: '4rem',
    },
  },

  footerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: 1400,
    margin: '0 auto',
    flexWrap: 'wrap',
    gap: '1.5rem',
    
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      textAlign: 'center',
    },
  },

  logo: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#FFFFFF',
    textDecoration: 'none',
  },

  footerLinks: {
    display: 'flex',
    gap: '2rem',
    
    [theme.breakpoints.down('sm')]: {
      gap: '1.5rem',
    },
  },

  footerLink: {
    color: 'rgba(255,255,255,0.5)',
    textDecoration: 'none',
    fontSize: '0.9rem',
    transition: 'color 0.3s',
    
    '&:hover': {
      color: '#D4A012',
    },
  },

  socialLinks: {
    display: 'flex',
    gap: '1rem',
  },

  socialLink: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    backgroundColor: 'rgba(255,255,255,0.05)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgba(255,255,255,0.5)',
    transition: 'all 0.3s',
    textDecoration: 'none',
    
    '&:hover': {
      backgroundColor: '#D4A012',
      color: '#0A0A0A',
    },
    
    '& svg': {
      width: 18,
      height: 18,
    },
  },
});

const Footer = ({ classes }) => {
  return (
    <footer className={classes.footer}>
      <div className={classes.footerContent}>
        <Link to="/" className={classes.logo}>
          Byline
        </Link>
        
        <div className={classes.footerLinks}>
          <Link to="/about" className={classes.footerLink}>
            About
          </Link>
          <a href="#" className={classes.footerLink}>
            Privacy
          </a>
          <a href="#" className={classes.footerLink}>
            Terms
          </a>
          <a href="mailto:hello@joinbyline.com" className={classes.footerLink}>
            Contact
          </a>
        </div>

        <div className={classes.socialLinks}>
          <a 
            href="https://twitter.com/joinbyline" 
            target="_blank" 
            rel="noopener noreferrer"
            className={classes.socialLink}
            aria-label="Twitter"
          >
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
            </svg>
          </a>
          <a 
            href="https://facebook.com/joinbyline" 
            target="_blank" 
            rel="noopener noreferrer"
            className={classes.socialLink}
            aria-label="Facebook"
          >
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default withStyles(styles)(Footer);
