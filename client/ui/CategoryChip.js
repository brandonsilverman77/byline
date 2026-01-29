import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';

const styles = theme => ({
  chip: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.6rem 1.25rem',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '50px',
    fontSize: '0.9rem',
    color: 'rgba(255, 255, 255, 0.7)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: "'Inter', sans-serif",
    
    '&:hover': {
      borderColor: '#D4A012',
      color: '#D4A012',
      backgroundColor: 'rgba(212, 160, 18, 0.1)',
      transform: 'translateY(-2px)',
    },
  },

  selected: {
    backgroundColor: '#D4A012',
    borderColor: '#D4A012',
    color: '#0A0A0A',
    
    '&:hover': {
      backgroundColor: '#FFCC00',
      borderColor: '#FFCC00',
      color: '#0A0A0A',
    },
  },

  icon: {
    fontSize: '0.85rem',
    opacity: 0.8,
  },

  label: {
    textTransform: 'capitalize',
  },
});

const CategoryChip = ({ classes, category, onClick, selected }) => {
  const chipClasses = classnames(classes.chip, {
    [classes.selected]: selected,
  });

  return (
    <button className={chipClasses} onClick={onClick}>
      <span className={classes.icon}>{getIcon(category.label)}</span>
      <span className={classes.label}>{category.label}</span>
    </button>
  );
};

export default createFragmentContainer(withStyles(styles)(CategoryChip), {
  category: graphql`
    fragment CategoryChip_category on Category {
      id
      objectId
      label
    }`,
});

function getIcon(label) {
  switch (label) {
    case "sports":
      return <FontAwesomeIcon icon="basketball-ball" />;
    case "politics":
      return <FontAwesomeIcon icon="landmark" />;
    case "culture":
      return <FontAwesomeIcon icon="palette" />;
    case "opinion":
      return <FontAwesomeIcon icon="pen-fancy" />;
    case "tech":
      return <FontAwesomeIcon icon="laptop-code" />;
    default:
      return null;
  }
}
