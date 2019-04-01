import React from 'react';
import './App.css';
import AppHeader from './components/AppHeader/AppHeader';
import NavigationPage from './containers/NavigationPage/NavigationPage';
import AppFooter from './components/AppFooter/AppFooter';

/**
 * The container component that wraps around whole application. It imports header, body and footer
 * of the application and includes them in the DOM.
 */
const App = () => {
  return (
    <div className="App">
      <AppHeader />
      <NavigationPage />
      <AppFooter />
    </div>
  );
};

export default App;
