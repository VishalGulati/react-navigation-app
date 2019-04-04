import React from 'react';

const LocationsContext = React.createContext({
  updateLocation: () => {},
  resetPending: false,
  resetComplete: () => {}
});

export default LocationsContext;
