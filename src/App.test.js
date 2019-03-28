import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';

global.loadJS = jest.fn();
const wrapper = shallow(<App />);

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('container has App class', () => {
    expect(wrapper.find('div.App').length).toEqual(1);
});
