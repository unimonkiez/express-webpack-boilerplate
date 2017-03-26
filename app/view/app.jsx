import React, { Component, PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from 'app/component/header.jsx';
import Spinner from 'app/component/spinner.jsx';
import getConfig from 'app/common/get-config.js';

export default class App extends Component {
  static childContextTypes = {
    setShowSpinner: PropTypes.func
  };
  getChildContext() {
    return {
      setShowSpinner: this.setShowSpinner
    };
  }
  componentWillMount() {
    this.state = {
      showSpinner: false
    };
    this.setShowSpinner(true);
    getConfig().then(config => {
      this.setState({
        config
      });
      this.setShowSpinner(false);
    });
  }
  setShowSpinner = this.setShowSpinner.bind(this);
  setShowSpinner(showSpinner) {
    this.setState({
      showSpinner
    });
  }
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Header />
          Your app
          {
          this.state.config &&
          <div>
            { this.state.config.name }
          </div>
          }
          {
            this.state.showSpinner &&
            <Spinner />
          }
        </div>
      </MuiThemeProvider>
    );
  }
}
