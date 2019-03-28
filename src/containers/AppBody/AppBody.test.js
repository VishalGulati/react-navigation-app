import React from 'react';
import ReactDOM from 'react-dom';
import AppBody from './AppBody';
import { shallow } from 'enzyme';

global.loadJS = jest.fn();
const wrapper = shallow(<AppBody />);

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AppBody />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('Component has container div with class app-body-container', () => {
    expect(wrapper.find('div.app-body-container').length).toEqual(1);
});


it('snapshot testing', () => {
    expect(wrapper).toMatchSnapshot();
});