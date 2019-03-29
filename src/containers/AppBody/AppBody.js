import React, { Component } from 'react';
import './AppBody.css';
import LeftPanel from '../../components/LeftPanel/LeftPanel';
import RightPanel from '../../components/RightPanel/RightPanel';
import LocationsContext from '../../context/LocationsContext';
import { GOOGLE_API_URL, DEFAULT_APP_STATE } from '../../config/constants';
import requestGenerator from '../../axios/AxiosLauncher';
import { URLS } from '../../config/endpoints';

/**
 * The application body, internally split into 2 halves: LeftPanel and RightPanel respectively.
 */
class AppBody extends Component {
  constructor(props) {
    super(props);
    this.state = { ...DEFAULT_APP_STATE };
  }

  handleChange = (key, value) => {
    this.setState({
      [key]: value
    });
  };

  getCords = obj => [obj.lat, obj.lng];

  checkForUnsuccessfulMsg = response => {
    switch (response.data.status) {
      case 'success':
        return '';
      case 'failure':
        return response.data.error;
      default:
        return response.data.status;
    }
  };

  setMessageInState = (msg, msgType = '') => {
    this.setState({
      message: msg,
      messageType: msgType,
      submitBtnLabel: 'Re-Submit'
    });
  };

  makeRequestForRoute = endpoint => {
    requestGenerator
      .getReq(endpoint)
      .then(result => {
        if (result.data.status === 'in progress') {
          return this.makeRequestForRoute(endpoint);
        }
        const unsuccessfulMsg = this.checkForUnsuccessfulMsg(result);
        if (unsuccessfulMsg) {
          this.setMessageInState(
            'Server responded with: ' + unsuccessfulMsg,
            'error'
          );
        } else {
          const { total_distance, total_time } = result.data;
          this.setMessageInState(
            'total distance: ' +
              total_distance +
              ' & ' +
              'total time: ' +
              total_time
          );
          this.setState({
            submitBtnLabel: 'Re-Submit',
            showRoute: true,
            route: result.data.path
          });
        }
      })
      .catch(response => {
        this.setMessageInState(
          'Something went wrong! Please try again in some time.',
          'error'
        );
      });
  };

  makeRequestForToken = (origin, destination) => {
    requestGenerator
      .postReq(URLS.submit, { origin, destination })
      .then(result => {
        const token = result && (result.data && result.data.token);
        const endpoint = URLS.getRoute.replace('{token}', token);
        this.makeRequestForRoute(endpoint);
      })
      .catch(response => {
        this.setMessageInState(
          'Something went wrong! Please try again in some time.',
          'error'
        );
      });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      submitBtnLabel: 'Loading...',
      message: '',
      messageType: '',
      showRoute: false,
      route: null
    });
    const { start, drop } = this.state;
    if (start && drop) {
      const origin = this.getCords(
          JSON.parse(JSON.stringify(this.state.start))
        ),
        destination = this.getCords(
          JSON.parse(JSON.stringify(this.state.drop))
        );
      this.makeRequestForToken(origin, destination);
    } else {
      this.setMessageInState(
        'Both starting point and drop-off location are mandatory!',
        'error'
      );
    }
  };

  resetDone = () => {
    this.setState({ resetPending: false });
  };

  handleReset = event => {
    this.setState({
      ...DEFAULT_APP_STATE,
      resetPending: true,
      mapLoaded: true
    });
  };

  initMap = () => {
    this.setState({ mapLoaded: true });
  };

  componentDidMount() {
    window.initMap = this.initMap;
    window.loadJS(`${GOOGLE_API_URL}&libraries=places&callback=initMap`);
  }

  render() {
    return (
      <div className="app-body-container">
        <div className="row">
          <LocationsContext.Provider
            value={{
              mapLoaded: this.state.mapLoaded,
              updateLocation: this.handleChange,
              resetPending: this.state.resetPending
            }}
          >
            <LeftPanel
              handleSubmit={this.handleSubmit}
              handleReset={this.handleReset}
              resetDone={this.resetDone}
              {...this.state}
            />
          </LocationsContext.Provider>
          <RightPanel
            mapLoaded={this.state.mapLoaded}
            showRoute={this.state.showRoute}
            resetPending={this.state.resetPending}
            route={this.state.route}
          />
        </div>
      </div>
    );
  }
}

export default AppBody;
