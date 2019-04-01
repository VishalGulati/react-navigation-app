import React from 'react';
import ReactDOM from 'react-dom';
import MapDisplay from './MapDisplay';
import { shallow } from 'enzyme';

const wrapper = shallow(<MapDisplay />);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MapDisplay />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Component has container div to hold the google map', () => {
  expect(wrapper.find('div#googleMap').length).toEqual(1);
});

it('snapshot testing', () => {
  expect(wrapper).toMatchSnapshot();
});
