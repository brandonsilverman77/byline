import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import {login} from 'Mutations/LoginMutation';
import PersonIcon from '@material-ui/icons/Person';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import LoadingButton from "UI/LoadingButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const styles = theme => ({
  personIcon: {
    color: "white"
  },
  
  userEmail: {
    color: "white"
  },
  
  userInfo: {
    display: 'flex',
    alignItems: 'center'
  },
  
  dialog: {
    minWidth: 300
  },

  twitterIconAdded: {
    color: "#00aced"
  }
  
});

class CategorizeAuthorDialogView extends Component {


  constructor(props) {
    super();
    
    this.state = {
      selected: props.author.categoryIds ? props.author.categoryIds : []
    }

  }
  
  handleChange = event => {
    console.log(event.target.value)
   this.setState({ selected: event.target.value });
 };

  
  render() {
    const {
      author, categories, classes, open, onSubmit, onOpen, onClose, state
    } = this.props;
    
    return <Dialog
        open={open}
        fullWidth
        maxWidth="sm"
        onClose={onClose}
        className={classes.dialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Categorize {author.name}</DialogTitle>
        <DialogContent fullWidth>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel htmlFor="select-multiple-checkbox">Categories</InputLabel>
            <Select
              multiple
              fullWidth
              minWidth="lg"
              value={this.state.selected}
              onChange={this.handleChange}
              renderValue={selected => selected.map(s => findCategoryLabel(categories, s)).join(', ')}
              input={<Input id="select-multiple-checkbox" />}>
              {categories.nodes.map(c => (
                <MenuItem key={c.objectId} value={c.objectId}>
                  <Checkbox checked={this.state.selected.indexOf(c.objectId) > -1} />
                  <ListItemText primary={c.label} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <LoadingButton 
            state={state}
            loadingText="Saving Categories"
            onClick={() => {
              onSubmit(this.state.selected);
            }}>
              Save
          </LoadingButton>
        </DialogActions>
      </Dialog>
  }
}

export default withStyles(styles)(CategorizeAuthorDialogView);

function findCategoryLabel(categories, id) {
  return categories.nodes.filter(c => {
    return c.objectId === id;
  })[0].label;
}