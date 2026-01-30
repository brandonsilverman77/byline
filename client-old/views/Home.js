import React, {PureComponent} from "react";
import Button from '@material-ui/core/Button';
import Environment from "../environment";
import {graphql, QueryRenderer} from 'react-relay';
import HomeView from "Views/HomeView";


class Home extends PureComponent {
  
  render() {
    return <HomeView {...this.props} />
  }
}

export default Home;