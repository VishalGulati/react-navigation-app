import React, { Component } from 'react';
import './RightPanel.css';
import PropTypes from 'prop-types';
import { getLocationOnMap } from '../../config/utilities';

/**
 * The Right halve of main page that displays the map with route based on search result.
 */
class RightPanel extends Component {
  showDefaultPosition = () => {
    this.directionsService = new window.google.maps.DirectionsService();
    this.directionsDisplay = new window.google.maps.DirectionsRenderer();
    this.map = new window.google.maps.Map(
      document.getElementById('googleMap'),
      {
        center: {
          lat: 51.509865,
          lng: -0.118092
        },
        zoom: 12,
        mapTypeId: 'roadmap'
      }
    );
  };

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
        }
      }
    );
  };

  resetMap = () => {
    this.directionsDisplay.setMap(null);
  };

  componentDidUpdate(prevProps) {
    if (this.props.mapLoaded && !prevProps.mapLoaded) {
      this.showDefaultPosition();
    }
    if (this.props.showRoute) {
      this.diaplayRoute();
    } else {
      this.resetMap();
    }
  }

  render() {
    return (
      <div className="col-xs-12 col-md-8">
        <div id="googleMap" />
      </div>
    );
  }
}

RightPanel.propTypes = {
  mapLoaded: PropTypes.bool,
  showRoute: PropTypes.bool,
  route: PropTypes.array
};

export default RightPanel;
