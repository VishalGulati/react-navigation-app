import React, { Component } from 'react';
import './NavigationPage.css';
import SearchForm from '../../components/SearchForm/SearchForm';
import MapDisplay from '../../components/MapDisplay/MapDisplay';
import LocationsContext from '../../context/locationsContext';
import {
  getApiUrl,
  DEFAULT_APP_STATE,
  ERROR_MESSAGES,
  API_STATUS,
  RETRY_COUNTER
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
      case API_STATUS.success:
        return '';
      case API_STATUS.failure:
        return response.data.error;
      case API_STATUS.progress:
        return ERROR_MESSAGES.retryFailure;
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
      isLoading: false,
      isDirty: true
    });
  };

  /**
     * @name makeRequestForRoute
     * @description This method makes a request for route based on the endpoint it receives and retries
     *  when server returns in progress status
     * @param endpoint the search endpoint
     */
  makeRequestForRoute = endpoint => {
    requestGenerator
      .getReq(endpoint)
      .then(result => {
        if (
          result.data.status === API_STATUS.progress &&
          this.state.retryCounter > 0
        ) {
          this.setState(prevState => ({
            retryCounter: prevState.retryCounter - 1
          }));
          return this.makeRequestForRoute(endpoint);
        }
        const unsuccessfulMsg = this.checkForUnsuccessfulMsg(result);
        if (unsuccessfulMsg) {
          this.setMessageInState(unsuccessfulMsg, 'error');
        } else {
          const { total_distance, total_time } = result.data;
          this.setMessageInState(
            'total distance: ' + total_distance + ' \ntotal time: ' + total_time
          );
          this.setState({
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
      isLoading: true,
      message: '',
      messageType: '',
      showRoute: false,
      route: null,
      retryCounter: RETRY_COUNTER
    });
    const { start, drop } = this.state;
    if (start && drop) {
      const origin = this.getCords(JSON.parse(JSON.stringify(start))),
        destination = this.getCords(JSON.parse(JSON.stringify(drop)));
      this.makeRequestForToken(origin, destination);
    } else {
      this.setMessageInState(ERROR_MESSAGES.uiValidationError, 'error');
    }
  };

  /**
     * @name resetDone
     * @description This method marks the reset flag to false when all fields have got reset
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
    const gmapsURL = getApiUrl();
    if (gmapsURL) {
      window.loadJS(`${gmapsURL}&libraries=places&callback=initMap`);
    }
  }

  render() {
    return (
      <div className="app-body-container">
        {this.state.mapLoaded ? (
          <div className="row">
            <LocationsContext.Provider
              value={{
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
              showRoute={this.state.showRoute}
              route={this.state.route}
            />
          </div>
        ) : (
          <h1 className="error">{ERROR_MESSAGES.appNotLoaded}</h1>
        )}
      </div>
    );
  }
}

export default NavigationPage;
