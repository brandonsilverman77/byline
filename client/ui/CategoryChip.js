import React from 'react';
import {createFragmentContainer, graphql} from 'react-relay';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classnames from 'classnames';

const styles = theme => ({

  chip: {
    marginBottom: 10,
    marginRight: 10,
    paddingLeft: 5
  },
  


});

const CategoryChip = ({classes, category, onClick, selected}) => {
  
  const chipClasses = classnames(classes.chip, {
    selected
  });
  
  return <Chip
    icon={getIcon(category.label)}
    className={chipClasses}
    variant={selected ? 'default' : 'outlined'}
    onClick={onClick}
    color={selected ? 'primary' : '#ccc'}
    label={category.label} />;
  
};

export default createFragmentContainer(withStyles(styles)(CategoryChip), {
  category: graphql`
    fragment CategoryChip_category on Category {
      id
      objectId
      label
    }`
});



function getIcon(label) {
  switch (label) {
  case "sports": 
    return <FontAwesomeIcon icon="basketball-ball" />
  case "politics":
    return <FontAwesomeIcon icon="landmark" />
  case "culture":
    return <FontAwesomeIcon icon="palette" />
  case "opinion":
    return <FontAwesomeIcon icon="pen-fancy" />
  case "tech":
    return <FontAwesomeIcon icon="laptop-code" />
  }
}

