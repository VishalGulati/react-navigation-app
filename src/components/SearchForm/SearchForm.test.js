import React from 'react';
import ReactDOM from 'react-dom';
import SearchForm from './SearchForm';
import { shallow } from 'enzyme';

const wrapper = shallow(<SearchForm />);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SearchForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Component has container div with class left-panel', () => {
  expect(wrapper.find('div.left-panel').length).toEqual(1);
});

it('Component has a form element', () => {
  expect(wrapper.find('form').length).toEqual(1);
});

it('Component has 2 buttons', () => {
  expect(wrapper.find('button').length).toEqual(2);
});

it('snapshot testing', () => {
  expect(wrapper).toMatchSnapshot();
});
