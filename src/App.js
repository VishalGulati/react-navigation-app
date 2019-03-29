import React from 'react';
import './App.css';
import AppHeader from './components/AppHeader/AppHeader';
import AppBody from './containers/AppBody/AppBody';
import AppFooter from './components/AppFooter/AppFooter';

const App = () => {
  return (
    <div className="App">
      <AppHeader />
      <AppBody />
      <AppFooter />
    </div>
  );
}

export default App;