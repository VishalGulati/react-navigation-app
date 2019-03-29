import React from 'react';
import ReactDOM from 'react-dom';
import AppFooter from './AppFooter';
import { shallow } from 'enzyme';

const wrapper = shallow(<AppFooter />);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppFooter />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Component has footer element', () => {
  expect(wrapper.find('footer').length).toEqual(1);
});

it('snapshot testing', () => {
  expect(wrapper).toMatchSnapshot();
});
