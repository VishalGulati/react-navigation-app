import React from 'react';
import ReactDOM from 'react-dom';
import Message from './Message';
import { shallow } from 'enzyme';

const dummyProps = {
    message: 'Test message',
    messageType: 'error'
}
const wrapper = shallow(<Message {...dummyProps} />);
describe('testing Message Component for non-error type messages', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Message {...dummyProps} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('Component has container p with class text-red', () => {
        expect(wrapper.find('p').hasClass('text-red')).toEqual(true);
    });
});

describe('testing Message Component for non-error type messages', () => {
    const dummyProps1 = {
        message: 'Test message',
        messageType: ''
    }
    const wrapper = shallow(<Message {...dummyProps1} />);

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Message {...dummyProps1} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('Component should not have container p with class text-red', () => {
        expect(wrapper.find('p').hasClass('text-red')).toEqual(false);
    });
});


it('snapshot testing', () => {
    expect(wrapper).toMatchSnapshot();
});