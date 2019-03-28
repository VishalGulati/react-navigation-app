import React, { Component } from 'react';
import './RightPanel.css';
import PropTypes from 'prop-types';

class RightPanel extends Component {
    showPosition = (position) => {
        this.directionsService = new window.google.maps.DirectionsService();
        this.directionsDisplay = new window.google.maps.DirectionsRenderer();
        this.map = new window.google.maps.Map(document.getElementById('googleMap'), {
            center: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            },
            zoom: 12,
            mapTypeId: 'roadmap',
        });
        this.directionsDisplay.setMap(this.map);
    }

    diaplayRoute = () => {
        const middlePoints = [...this.props.route];
        const origin = middlePoints.shift();
        const destination = middlePoints.pop();
        console.log('órigin : ' + origin)
        console.log('destination : ' + destination)
        // const wayPointsRoute = middlePoints.map((middlePt) => {
        //     return new window.google.maps.LatLng(middlePt[0], middlePt[1])
        // })
        this.directionsService.route({
            origin: new window.google.maps.LatLng(origin[0], origin[1]),
            destination: new window.google.maps.LatLng(destination[0], destination[1]),
            travelMode: 'DRIVING'
        }, (response, status) => {
            if (status === 'OK') {
                this.directionsDisplay.setDirections(response);
            } else {
                console.log('Directions request failed due to ' + status);
            }
        });
    }

    componentDidUpdate(prevProps) {
        //&& !prevProps.mapLoaded
        if (this.props.mapLoaded) {
            if (this.props.showRoute) {
                this.diaplayRoute();
            } else {
                navigator.geolocation.getCurrentPosition(this.showPosition);
            }
        }
    }

    render() {
        return (
            <div className="col-xs-12 col-md-8">
                <div id="googleMap"></div>
            </div>
        );
    }
}

RightPanel.propTypes = {
    mapLoaded: PropTypes.bool
};

export default RightPanel;