import React from "react";
import { graphql, createFragmentContainer } from 'react-relay';
import CategoryChip from 'UI/CategoryChip';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

const styles = theme => ({
  container: {
    flexGrow: 1,
    maxWidth: 600,
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
  },

  categoryChips: {
    justifyContent: 'center',
    flexWrap: 'wrap',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    
    [theme.breakpoints.down('xs')]: {
      padding: 5,
      gap: '0.5rem',
    },
  },

  categoryHint: {
    marginTop: 16,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: '0.9rem',
  },
});

const CategoryChipList = (props) => {
  const {
    categories,
    categoryIds,
    selected,
    ignoreHint,
    onSelect,
    className,
    classes,
  } = props;

  let selectedCategory = null;

  let categoryChips = categoryIds.map(cid => {
    if (selected && selected[cid]) {
      selectedCategory = findCategory(categories, cid);
    }

    return (
      <CategoryChip
        onClick={() => {
          if (onSelect) {
            onSelect(cid);
          }
        }}
        selected={selected ? selected[cid] : false}
        key={cid}
        category={findCategory(categories, cid)}
      />
    );
  });

  const classNames = classnames(classes.categoryChips, className);

  return (
    <Grid className={classes.container}>
      <div className={classNames}>
        {categoryChips}
      </div>
      {selectedCategory && !ignoreHint ? (
        <Typography className={classes.categoryHint}>
          Popular writers in {selectedCategory.label}
        </Typography>
      ) : null}
    </Grid>
  );
};

export default createFragmentContainer(withStyles(styles)(CategoryChipList), {
  categories: graphql`
    fragment CategoryChipList_categories on CategoryConnection {
      nodes {
        objectId  
        label
        ...CategoryChip_category
      }
    }`,
});

function findCategory(categories, id) {
  return categories.nodes.find(c => {
    return c.objectId === id;
  });
}
