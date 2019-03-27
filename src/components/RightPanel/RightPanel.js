import React, { Component } from 'react';
import './RightPanel.css';
import PropTypes from 'prop-types';

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

    componentDidUpdate(prevProps) {
        if (this.props.mapLoaded && !prevProps.mapLoaded) {
            navigator.geolocation.getCurrentPosition(this.showPosition);
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