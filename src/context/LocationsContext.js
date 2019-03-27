import React from 'react';

const LocationsContext  = React.createContext({
    mapLoaded: false,
    updateLocation: () => {
    }
});

export default LocationsContext;