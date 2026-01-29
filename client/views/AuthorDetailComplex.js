import React, {PureComponent} from 'react';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import AuthorDetailHeader from 'Views/AuthorDetailHeader';
import CategoryChipList from 'UI/CategoryChipList';
import Collapse from '@material-ui/core/Collapse';
import AuthorDetailActions from 'Views/AuthorDetailActions'
import Divider from '@material-ui/core/Divider';
import Menu from '@material-ui/core/Menu';
import StarIcon from '@material-ui/icons/Star';
import CategoryIcon from '@material-ui/icons/Category';
import StarOutlinedIcon from '@material-ui/icons/StarOutlined';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddTwitterDialog from 'Views/AddTwitterDialog';
import CategorizeAuthorDialog from 'Views/CategorizeAuthorDialog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const styles = theme => ({
  container: {
    // background: theme.palette.primary,
    padding: 0,
    boxShadow: 'none'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  
  chip: {
    marginBottom: 10,
    marginRight: 10
  },
  
  chipList: {
    justifyContent: "flex-start",
    transform: "translateY(0px)",
    marginTop: 10,
    marginLeft: 0
  },
  
  
  twitterIcon: {
    fontSize: 22,
    marginLeft: 1
  },
  
  collapsedContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  }

});

class AuthorDetailComplex extends PureComponent {
  
  state = {
    expanded: false,
    anchorEl: null,
    twitterDialogOpen: false,
    categoryDialogOpen: false
  };
  
  _handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };
    
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  
  
  render() {
    const {actionProps, classes, author, categories} = this.props;
    const {name, domains} = author;
    
    const {user} = actionProps;
    
    const {anchorEl, twitterDialogOpen, categoryDialogOpen} = this.state;

    
      
    let headerProps = Object.assign({}, this.props);
    delete headerProps.classes;
    headerProps.onExpand = this._handleExpandClick;
    headerProps.expanded = this.state.expanded;
    
    let twitterText = "Connect To Twitter"; 
    
    if (author.twitterId) {
      twitterText = "Connected To Twitter";
    }
    
    
    let featuredText = "Feature";
    
    if (author.featured) {
      featuredText = "Featured";
    }
    
    
    return (
      <React.Fragment>
        <AddTwitterDialog 
          author={author} 
          open={twitterDialogOpen} onClose={() => {
          this.setState({twitterDialogOpen: false});
          this.handleClose();
        }} />
        <CategorizeAuthorDialog 
          author={author} 
          open={categoryDialogOpen} categories={categories} onClose={() => {
          this.setState({categoryDialogOpen: false});
          this.handleClose();
        }} />
        <AuthorDetailHeader {...headerProps}></AuthorDetailHeader>
        {/*
          author.twitterProfileImageUrl ?
          <CardMedia
            className={classes.media}
            image={author.twitterProfileImageUrl}
            title="background image" /> : null
        */}
        
          {/*
            author.twitterId ?
            <Chip
              className={classes.chip}
              label="Connected To Twitter"
            /> : null
          */}
          {/*
            author.featured ?
            <Chip
              className={classes.chip}
              label="Featured"
            /> : null
          */}

        
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent className={classes.collapsedContent}>
              <div>
              <Typography component="p">
              {author.bio}
              </Typography>
              <CategoryChipList 
                ignoreHint
                className={classes.chipList}
                categoryIds={author.categoryIds} 
                categories={categories} />
              </div>
              {user && user.superadmin 
                ? <IconButton onClick={this.handleClick}>
                  <MoreVertIcon />
                </IconButton> : null
              }
              
            </CardContent>   
            

            {user && user.superadmin ? <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}>
              <MenuItem onClick={() => {
                this.setState({categoryDialogOpen: true})
              }}>
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText inset primary="Categorize" />
              </MenuItem>
              <MenuItem onClick={this.toggleFeatured}>
                <ListItemIcon>
                  <StarOutlinedIcon />
                </ListItemIcon>
                <ListItemText inset primary={featuredText} />  
              </MenuItem>
              <MenuItem onClick={() => {
                this.setState({twitterDialogOpen: true})
              }}>
                <ListItemIcon>
                  <FontAwesomeIcon className={classes.twitterIcon} icon={["fab", "twitter"]} />
                </ListItemIcon>
                <ListItemText inset primary={twitterText} />  
              </MenuItem>
            </Menu> : null}
          </Collapse>

      </React.Fragment>
    );
  }
}

export default withStyles(styles)(AuthorDetailComplex);
