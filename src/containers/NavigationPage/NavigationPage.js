import React, { Component } from 'react';
import './NavigationPage.css';
import SearchForm from '../../components/SearchForm/SearchForm';
import MapDisplay from '../../components/MapDisplay/MapDisplay';
import LocationsContext from '../../context/locationsContext';
import {
  GOOGLE_API_URL,
  DEFAULT_APP_STATE,
  ERROR_MESSAGES,
  IN_PROGRESS_STATUS
} from '../../config/constants';
import requestGenerator from '../../http-client/httpClient';
import { URLS } from '../../config/endpoints';

/**
 * The application body, internally split into 2 halves: SearchForm and MapDisplay respectively.
 */
class NavigationPage extends Component {
  constructor(props) {
    super(props);
    this.state = { ...DEFAULT_APP_STATE };
  }

  /**
     * @name handleChange
     * @description This method updates the state based on params
     * @param key Key in state that needs to be updated
     * @param value Value for the key in state that needs to be updated
     */
  handleChange = (key, value) => {
    this.setState({
      [key]: value
    });
  };

  /**
     * @name getCords
     * @description This method returns latitude and longitude in array from the object
     * @param obj Object that contains keys lat and lng
     */
  getCords = obj => [obj.lat, obj.lng];

  /**
     * @name checkForUnsuccessfulMsg
     * @description This method checks if service responds with unsuccessful message
     * @param response the search response
     */
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

  /**
     * @name setMessageInState
     * @description This method updates the message and messageType properties in state
     * @param msg Message to be displayed
     * @param msgType Type of message
     */
  setMessageInState = (msg, msgType = '') => {
    this.setState({
      message: msg,
      messageType: msgType,
      submitBtnLabel: 'Re-Submit'
    });
  };

  /**
     * @name makeRequestForRoute
     * @description This method makes a request for route based on the endpoint it receives
     * @param endpoint the search endpoint
     */
  makeRequestForRoute = endpoint => {
    requestGenerator
      .getReq(endpoint)
      .then(result => {
        if (result.data.status === IN_PROGRESS_STATUS) {
          return this.makeRequestForRoute(endpoint);
        }
        const unsuccessfulMsg = this.checkForUnsuccessfulMsg(result);
        if (unsuccessfulMsg) {
          this.setMessageInState(unsuccessfulMsg, 'error');
        } else {
          const { total_distance, total_time } = result.data;
          this.setMessageInState(
            'total distance: ' +
              total_distance +
              ' <br/> total time: ' +
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
        this.setMessageInState(ERROR_MESSAGES.serviceError, 'error');
      });
  };

  /**
     * @name makeRequestForToken
     * @description This method makes a request for token
     * @param origin the origin location
     * @param destination the drop-of location
     */
  makeRequestForToken = (origin, destination) => {
    requestGenerator
      .postReq(URLS.submit, { origin, destination })
      .then(result => {
        const token = result && (result.data && result.data.token);
        const endpoint = URLS.getRoute.replace('{token}', token);
        this.makeRequestForRoute(endpoint);
      })
      .catch(response => {
        this.setMessageInState(ERROR_MESSAGES.serviceError, 'error');
      });
  };

  /**
     * @name handleSubmit
     * @description This method executes on form submit
     * @param event form submit event
     */
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
      this.setMessageInState(ERROR_MESSAGES.uiValidationError, 'error');
    }
  };

  /**
     * @name resetDone
     * @description This method marks the reset flag to true
     */
  resetDone = () => {
    this.setState({ resetPending: false });
  };

  /**
     * @name handleReset
     * @description This method executes on reset button click
     * @param event button click synthetic event
     */
  handleReset = event => {
    this.setState({
      ...DEFAULT_APP_STATE,
      resetPending: true,
      mapLoaded: true
    });
  };

  /**
     * @name initMap
     * @description This method executes when app successfully loads Google maps
     */
  initMap = () => {
    this.setState({ mapLoaded: true });
  };

  /**
 * @name componentDidUpdate
 * @description React component lifecycle hook
 */
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
            <SearchForm
              handleSubmit={this.handleSubmit}
              handleReset={this.handleReset}
              resetDone={this.resetDone}
              {...this.state}
            />
          </LocationsContext.Provider>
          <MapDisplay
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

export default NavigationPage;
