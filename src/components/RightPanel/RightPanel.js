import React, { Component } from 'react';
import './RightPanel.css';

class RightPanel extends Component {

    showPosition = (position) => {
        this.map = new window.google.maps.Map(document.getElementById('googleMap'), {
            center: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            },
            zoom: 12,
            mapTypeId: 'roadmap',
        });
    }

    initMap = () => {
        navigator.geolocation.getCurrentPosition(this.showPosition);
    }

    componentDidMount() {
        window.initMap = this.initMap;
        window.loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyD2D0r1DXCw-EMAB1xTlc4SFnsN5z7CGx4&libraries=places&callback=initMap')
    }

    render() {
        return (
            <div className="col-xs-12 col-md-8">
                <div id="googleMap"></div>
            </div>
        );
    }
}

export default RightPanel;