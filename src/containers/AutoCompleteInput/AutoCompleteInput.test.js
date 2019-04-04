import React from 'react';
import ReactDOM from 'react-dom';
import AutoCompleteInput from './AutoCompleteInput';
import { shallow } from 'enzyme';

window.google = {
  maps: {
    places: {
      Autocomplete: class {
        addListener = jest.fn();
      }
    }
  }
};

const wrapper = shallow(<AutoCompleteInput />);
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AutoCompleteInput />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Component has input element', () => {
  expect(wrapper.find('input').length).toEqual(1);
});

it('snapshot testing', () => {
  expect(wrapper).toMatchSnapshot();
});
