import React, { Component } from 'react';
import './MapDisplay.css';
import PropTypes from 'prop-types';
import { getLocationOnMap } from '../../config/utilities';

/**
 * The Right halve of main page that displays the map with route based on search result.
 */
class MapDisplay extends Component {
  /**
 * @name showDefaultPosition
 * @description This method shows default position on map when the app load
 */
  showDefaultPosition = () => {
    this.directionsService = new window.google.maps.DirectionsService();
    this.directionsDisplay = new window.google.maps.DirectionsRenderer();
    this.map = new window.google.maps.Map(this.mapWrapper, {
      center: {
        lat: 51.509865,
        lng: -0.118092
      },
      zoom: 12,
      mapTypeId: 'roadmap'
    });
  };

  /**
 * @name diaplayRoute
 * @description This method displays the route on map once search request is successful
 */
  diaplayRoute = () => {
    this.directionsDisplay.setMap(this.map);
    const middlePoints = [...this.props.route];
    const origin = middlePoints.shift();
    const destination = middlePoints.pop();
    const wayPointsRoute = middlePoints.map(middlePt => {
      return {
        location: getLocationOnMap(middlePt[0], middlePt[1]),
        stopover: true
      };
    });
    this.directionsService.route(
      {
        origin: getLocationOnMap(origin[0], origin[1]),
        destination: getLocationOnMap(destination[0], destination[1]),
        waypoints: wayPointsRoute,
        optimizeWaypoints: true,
        travelMode: 'DRIVING'
      },
      (response, status) => {
        if (status === 'OK') {
          this.directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed with status: ' + status);
        }
      }
    );
  };

  /**
 * @name resetMap
 * @description This method removes the previously displayed route from map
 */
  resetMap = () => {
    this.directionsDisplay.setMap(null);
  };

  /**
 * @name componentDidUpdate
 * @description React component lifecycle hook
 */
  componentDidUpdate(prevProps) {
    if (this.props.showRoute) {
      this.diaplayRoute();
    } else {
      this.resetMap();
    }
  }

  componentDidMount() {
    this.showDefaultPosition();
  }

  render() {
    return (
      <div className="col-xs-12 col-md-8">
        <div id="googleMap" ref={el => (this.mapWrapper = el)} />
      </div>
    );
  }
}

MapDisplay.propTypes = {
  showRoute: PropTypes.bool,
  route: PropTypes.array
};

export default MapDisplay;
