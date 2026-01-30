import React from 'react';
import classnames from "classnames";
import CheckIcon from '@material-ui/icons/Check';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import Button from '@material-ui/core/Button';

const styles = theme => ({



  buttonSuccess: {
    background: green[500]
  },
  check: {
    color: "white"
  }
  
});

export default withStyles(styles)((props) => {
  
  const {disabled, state, className, onClick, children, classes, loadingText} = props;
  
  let buttonContent = children;
  if (state === "submitting") {
    buttonContent = <React.Fragment>{loadingText ? loadingText : "Saving"}&nbsp;&nbsp;<CircularProgress color="secondary" className={classes.buttonProgress} size={24} /></React.Fragment>
  } else if (state === "success") {
    buttonContent = <CheckIcon className={classes.check} color="white" />
  }
  
  const buttonClasses = classnames({
    [classes.buttonSuccess]: state === "success"
  }, className);
  
  
  return (
    <Button 
      disabled={disabled || state === "submitting"}
      variant="contained" 
      className={buttonClasses} 
      onClick={onClick}
      color="secondary">{buttonContent}
    </Button>

  )
});