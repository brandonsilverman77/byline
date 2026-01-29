import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
  footer: {
    width: "100%",
    // background: theme.palette.gray.main,
    background: 'white',
    display: 'flex',
    borderTop: `1px solid ${theme.palette.gray.light}`,
    alignItems: 'center',
    boxSizing: "border-box",
    padding: "10px 30px",
    justifyContent: 'space-between',
    alignSelf: 'flex-end',
    justifySelf: 'flex-end',
    minHeight: 80,
    // position: 'fixed',
    // bottom: 0,
    // margin: theme.spacing.unit,
  },
  
  p: {
    color: theme.palette.gray.main,
    fontFamily: theme.typography.fontFamily,
    fontSize: 12
  },
  
  twitterIcon: {
    background: '#00aced',
    marginLeft: 10,
    marginRight: 10
  },
  
  facebookIcon: {
    background: '#3B5998',
    width: 48,
    boxSizing: 'border-box',
    textAlign: 'center'
  },
  
  featherWrapper: {
    width: 25
  },
  
  feather: {
    width: '100%'
  },
  
  icon: {
    width: 30
  }
});

export default withStyles(styles)((props) => {
  const {classes} = props;
  return (
    <div className={classes.footer}>
      <div className={classes.social}>
        <IconButton>
          <div className={classes.featherWrapper}>
            <img className={classes.feather} src={window.storeProps.assets.colorFeather} />
          </div>
        </IconButton>
        
      </div>
      <div>
        <a className={classes.p} href="mailto:hello@joinbyline.com">hello@joinbyline.com</a>
        <IconButton target="_blank" className={classes.twitterIcon} href='https://twitter.com/joinbyline'>
          <FontAwesomeIcon className={classes.icon} icon={["fab", "twitter"]} />
        </IconButton>
        <IconButton target="_blank" className={classes.facebookIcon} href='https://facebook.com/joinbyline'>
          <FontAwesomeIcon className={classes.icon} icon={["fab", "facebook"]} />
        </IconButton>
      </div>  
    </div>
  )
});
 