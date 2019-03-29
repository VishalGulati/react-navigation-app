import React from 'react';
import ReactDOM from 'react-dom';
import AppHeader from './AppHeader';
import { shallow } from 'enzyme';
const wrapper = shallow(<AppHeader />);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppHeader />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Component has header element', () => {
  expect(wrapper.find('header').length).toEqual(1);
});

it('snapshot testing', () => {
  expect(wrapper).toMatchSnapshot();
});
