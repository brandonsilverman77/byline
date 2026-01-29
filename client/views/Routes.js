import React, { Fragment, PureComponent } from "react";
import { Switch, Route } from 'react-router';
import { Router } from 'react-router-dom';
import Nav from "Views/Nav";
import Home from "Views/Home";
import Admin from "Views/Admin";
import About from "Views/About";
import Footer from 'Views/Footer';
import { withStyles } from '@material-ui/core/styles';
import PubSub, { Events } from 'Utilities/pub-sub';

const styles = theme => ({
  foundation: {
    minHeight: "100vh",
    display: 'flex',
    flexDirection: 'column',
  },

  body: {
    backgroundColor: "#0A0A0A",
    margin: 0,
    minHeight: '100vh',
  },

  main: {
    flex: 1,
  },
});

class Routes extends PureComponent {
  constructor(props) {
    super(props);
    document.querySelector("body").classList.add(props.classes.body);
    document.querySelector("#react-foundation").classList.add(props.classes.foundation);

    this.state = {
      hasFilter: false,
    };

    PubSub.subscribe(Events.CLEAR_FILTERS, this._clearFilter);
  }

  _setHasFilter = () => {
    this.setState({ hasFilter: true });
  };

  _clearFilter = () => {
    this.setState({ hasFilter: false });
  };

  render() {
    const { classes } = this.props;
    
    return (
      <Router history={this.props.history}>
        <Fragment>
          <Nav 
            user={this.props.user} 
            hasFilter={this.state.hasFilter} 
            clearHasFilter={this._clearFilter} 
          />
          <main className={classes.main}>
            <Switch>
              <Route
                exact
                path="/"
                render={() => {
                  return (
                    <Home
                      onFilter={this._setHasFilter}
                      clearHasFilter={this._clearFilter}
                    />
                  );
                }}
              />
              <Route
                path="/admin"
                render={() => {
                  return (
                    <Admin
                      setHasFilter={() => {
                        this.setState({ hasFilter: true });
                      }}
                    />
                  );
                }}
              />
              <Route
                path="/about"
                render={() => {
                  return (
                    <About
                      setHasFilter={() => {
                        this.setState({ hasFilter: true });
                      }}
                    />
                  );
                }}
              />
            </Switch>
          </main>
          <Footer />
        </Fragment>
      </Router>
    );
  }
}

export default withStyles(styles)(Routes);
