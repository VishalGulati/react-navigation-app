import React from 'react';
import ReactDOM from 'react-dom';
import RightPanel from './RightPanel';
import { shallow } from 'enzyme';

const wrapper = shallow(<RightPanel />);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RightPanel />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Component has container div to hold the google map', () => {
  expect(wrapper.find('div#googleMap').length).toEqual(1);
});

it('snapshot testing', () => {
  expect(wrapper).toMatchSnapshot();
});
