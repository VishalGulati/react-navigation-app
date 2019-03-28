import React from 'react';
import ReactDOM from 'react-dom';
import FormGroup from './FormGroup';
import { shallow } from 'enzyme';

const wrapper = shallow(<FormGroup />);

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FormGroup />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('Component has container div with class form-group', () => {
    expect(wrapper.find('div').hasClass('form-group')).toEqual(true);
});


it('snapshot testing', () => {
    expect(wrapper).toMatchSnapshot();
});