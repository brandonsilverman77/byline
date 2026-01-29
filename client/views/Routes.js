import React, {Fragment, PureComponent} from "react";
import {Switch, Route} from 'react-router';
import {Router} from 'react-router-dom';
import Nav from "Views/Nav";
import Home from "Views/Home";
import Admin from "Views/Admin";
import About from "Views/About";
import Footer from 'Views/Footer';
import { withStyles } from '@material-ui/core/styles';
import PubSub, {Events} from 'Utilities/pub-sub';


const styles = theme => ({

  
  foundation: {
    height: "100%",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  
  body: {
    background: "white",
    paddingTop: 65,
    margin: 0,

    // background: 'linear-gradient(138deg, rgba(255,152,0,1) 0%, rgba(255,193,7,1) 33%, rgba(255,235,59,1) 100%)'

  },
  
});

class Routes extends PureComponent {
  
  constructor(props) { 
    super(props);
    document.querySelector("body").classList.add(props.classes.body);
    document.querySelector("#react-foundation").classList.add(props.classes.foundation);
    
    this.state = {
      hasFilter: true
    }
    
    PubSub.subscribe(Events.CLEAR_FILTERS, this._clearFilter);
  }
  
  _setHasFilter = () => {
    this.setState({hasFilter: true});
  }
  
  _clearFilter = () => {
    this.setState({hasFilter: false});
  }
  
  render() {
    return (
      <Router history={this.props.history}>
        <Fragment>
          <div>
            <Nav user={this.props.user} hasFilter={this.state.hasFilter} clearHasFilter={this._clearFilter} />
            <Switch>
              <Route exact path="/" render={() => {
                return <Home onFilter={this._setHasFilter} clearHasFilter={this._clearFilter} />;
              }} />
              <Route path="/admin" render={() => {
                return <Admin setHasFilter={() => {
                  this.setState({hasFilter: true});
                }} />;
              }} />
              <Route path="/about" render={() => {
                return <About setHasFilter={() => {
                  this.setState({hasFilter: true});
                }} />;
              }} />
            </Switch>
          </div>
          <Footer />
        </Fragment>
      </Router>
    )
  }
}

export default withStyles(styles)(Routes);