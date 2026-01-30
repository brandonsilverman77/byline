import React, {Component} from "react";
import ReactDOM from "react-dom";
import { library } from '@fortawesome/fontawesome-svg-core'
import { SnackbarProvider } from 'notistack';
import Routes from 'Views/Routes';
import CircularProgress from '@material-ui/core/CircularProgress';


import AnalyticsManager from "Utilities/analytics-manager";
import {createBrowserHistory} from "history";
const history = createBrowserHistory();
import {graphql, QueryRenderer} from 'react-relay';
import Environment from "./environment";


// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons'
import {
  faBasketballBall, faLandmark, faLaptopCode,
  faPalette, faPenFancy
} from '@fortawesome/free-solid-svg-icons';
// import {faTwitter} from '@fortawesome/free-brands-svg-icons';
library.add(fab, faBasketballBall, faLandmark, faLaptopCode, faPalette, faPenFancy);

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import amber from '@material-ui/core/colors/amber';
import yellow from '@material-ui/core/colors/yellow';
import indigo from '@material-ui/core/colors/indigo';
import grey from '@material-ui/core/colors/grey';

const theme = createMuiTheme({
  palette: {
    primary: amber,
    secondary: {
      main: amber[800]
    },
    gray: {
      main: grey[800],
      light: grey[300]
    }
  },

  
});


class App extends Component {
  
    componentDidMount() {
      const {history} = this.props;
      this.analyticsManager = new AnalyticsManager({history});
      this.unlisten = history.listen((location, action) => {
          document.querySelector("body").scrollTop = 0;
      });
  
      this.forceUpdate();
      
      
      
    }
    
    componentWillUnmount() {
      this.analyticsManager.unmount();
      this.unlisten();
    }

    render() {
        return (
          <MuiThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={3}>
              <QueryRenderer
                environment={Environment}
                query={graphql`
                  query appQuery  {
                    app {
                      user {
                        ...LoginDialog_user
                      }
                    }
                  }`
                }
                variables={{}}
                render={({error, props}) => {
                  if (error) {
                    return <div>Error!</div>;
                  }
                  if (!props) {
                    return <CircularProgress />
                  }
                          
                  return <Routes user={props.app.user} history={this.props.history} />
                }}
              />
            </SnackbarProvider>
          </MuiThemeProvider>
        );
    }
}


window.boot = () => {
    const el = document.getElementById("react-foundation");
    if (el) {
        ReactDOM.render(<App history={history} />, el);
    }
};
