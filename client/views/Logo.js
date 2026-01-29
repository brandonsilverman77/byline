import React from 'react';
import {Link} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import PubSub, {Events} from 'Utilities/pub-sub';

const styles = theme => ({
    
  logo: {
    width: 250,
    textAlign: 'center',
    marginBottom: 20,
    transition: 'width .25s'
  },
  
  logoImg: {
    width: "100%"
  },

});

export default withStyles(styles)((props) => {
  
  const {classes} = props;
  
  const logoClasses = classnames(classes.logo, props.className);
    
  return (
    <Link to="/" onClick={() => {
      PubSub.trigger(Events.CLEAR_FILTERS);
    }}>
      <div className={logoClasses}>
        <img className={classes.logoImg} src={window.storeProps.assets.logoBeta} />
      </div>
    </Link> 
  )
});