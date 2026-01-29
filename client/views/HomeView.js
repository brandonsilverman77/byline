import React, {PureComponent} from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import {debounce} from 'lodash';
import PropTypes from "prop-types";
import AuthorSearch from "Views/AuthorSearch";
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import CategoryChipListContainer from 'Views/CategoryChipListContainer';
import Logo from 'Views/Logo';
import {shuffle} from 'lodash';
import classnames from 'classnames';
import PubSub, {Events} from 'Utilities/pub-sub';


const styles = theme => ({
  textField: {
    width: "100%",
    
    [theme.breakpoints.down('xs')]: {
      fontSize: 14,
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: 24,
    },

    color: theme.palette.gray.main
    // margin: theme.spacing.unit,
  },
  

  
  wrapper: {
    display: "flex",
    marginTop: 30,
    alignItems: "center",
    padding: "10px 20px",
    width: "80%",
    maxHeight: 60,
    // transform: "translateY(50px)", 
    justifyContent: "space-between",
    // transition: 'margin .5s'
  },
  
  hasFilterTextField: {
    marginTop: 0
  },
  

  header: {
    fontFamily: "Roboto Slab",
    fontSize: "50px",
    textAlign: "center",
    letterSpacing: "2px",
    marginBottom: "20px",
    marginTop: "75px",
    color: "white",
    textShadow: "1px 1px 1px rgba(0,0,0, .8)"
  },
  
  subhead: {
    color: "#666",
    fontSize: 20,
    // marginBottom: -10,

    fontFamily: theme.typography.fontFamily,
    // textShadow: "1px 1px 1px rgba(0,0,0, .8)"

  },
  
  headerContainer: {
    // backgroundImage: `url(${window.storeProps.assets.bgBig})`,
    // backgroundSize: 'cover',
    // backgroundPosition: 'center',
    // background: 'rgb(255,152,0)',
    padding: 0,
    alignItems: 'center',
    flexDirection: 'column' 

  },
  loginButton: {

  },
  
  subHeadWrapper: {
    display: 'flex',
    alignItems: 'flex-end'
  },
  

  authorContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 50
  },
  
  mainContent: {
    // background: "#f7f7f7",
    // height: '100%',
    paddingTop: 20,
    paddingBottom: 200,
    width: '100%'
  },
  
  iconButton: {
    fontSize: "40px"
  },
  
  searchWrapper: {
    width: '100%',
    // marginTop: 30
  },
  
  searchIcon: {
    color: theme.palette.primary.main,
    [theme.breakpoints.down('xs')]: {
      fontSize: 24,
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: 40,
    },
  },
  
  logoAndTag: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  
  tag: {
    textAlign: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  
  hasFilterTag: {
      display: 'none'
  },
  
  hasFilterLogo: {
    width: 100,
    display: 'none'
  },
  
  categoryHint: {
    textAlign: 'center',
    marginTop: 10
  }
  

  
  
});

class HomeView extends PureComponent {
  

  
  constructor(props) {
    super();
    this._handleChange = debounce((search) => {
      props.onFilter();
      this.setState({search, hasFilter: true});
    }, 300);
    
    this.state = {
      search: "",
      categories: {},
      hasFilter: false
    }
    
    this.search = React.createRef();
    
    props.clearHasFilter();
    
    PubSub.subscribe(Events.CLEAR_FILTERS, this.clearFilters);

  }
  
  clearFilters = () => {
    this.search.current.value = '';
    this.setState({search: "", categories: {}, hasFilter: false});
  }
  
  toggleCategory = (cid) => {
    let categories = Object.assign({}, this.state.categories);
    
    if (categories[cid]) {
      categories = {};
    } else {
      categories = {};
      categories[cid] = true;
    }
    this.props.onFilter();
    this.setState({categories, hasFilter: true});
  };

  render() {
    
    const {search, categories, hasFilter} = this.state;
    const {classes} = this.props;
        
    
    const containerClasses = classnames(classes.content, {
      hasFilter
    });
    
    const logoAndTagClasses = classnames(classes.logoAndTag)
    
    const logoClasses = classnames({
      [classes.hasFilterLogo]: hasFilter
    })
    
    const taglineClasses = classnames(classes.tag, {
      [classes.hasFilterTag]: hasFilter
    })
    
    const textFieldClasses = classnames(classes.wrapper, {
      [classes.hasFilterTextField]: hasFilter
    });
    
    console.log("homeview props", this.props);
    
    
    
    return (
      <Grid container className={containerClasses}>
        <Grid style={{padding: 0, paddingTop: 40}} className={classes.headerContainer} item xs={12} container={true} justify="center">
          <div className={logoAndTagClasses}>
            <Logo className={logoClasses} />
            <Typography className={taglineClasses}>Follow your favorite writers and get their latest articles delivered to your inbox each night</Typography>
          </div>
          <Paper className={textFieldClasses} elevation={1}>
            <InputBase 
              onChange={(e) => {
                this._handleChange(e.target.value);
              }}
              inputRef={this.search}
              className={classes.textField} 
              startAdornment={(
                <InputAdornment position="start">
                  <SearchIcon fontSize='large' className={classes.searchIcon} />
                </InputAdornment>
              )}
              placeholder={"Search for your favorite writers..."} />
      
          </Paper>
        {/*<div className={classes.subHeadWrapper}><h3 className={classes.subhead}>A digest of your favorite writers, delivered daily</h3></div>*/}            

        </Grid>    
        <div className={classes.mainContent}>
          <CategoryChipListContainer 
            onSelect={this.toggleCategory}
            selected={categories} />
          <Grid className={classes.authorContainer} container={true} justify="center">
            <AuthorSearch search={search} categories={categories} />
          </Grid>
        </div>
      </Grid>  
    )
  }
}

export default withStyles(styles)(HomeView);

const placeholders = [
  "E.g., Bill Simmons",
  "E.g., Malcolm Galdwell",
  "E.g., Nate Silver",
  "E.g., Ben Thompson",
  "E.g., Taylor Lorenz"
]

const placeholder = shuffle(placeholders)[0];

/**

*/