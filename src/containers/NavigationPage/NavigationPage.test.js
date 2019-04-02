import React from 'react';
import ReactDOM from 'react-dom';
import NavigationPage from './NavigationPage';
import { shallow } from 'enzyme';

global.loadJS = jest.fn();
const wrapper = shallow(<NavigationPage />);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NavigationPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Component has container div with class app-body-container', () => {
  expect(wrapper.find('div.app-body-container').length).toEqual(1);
});

it('snapshot testing', () => {
  expect(wrapper).toMatchSnapshot();
});

describe('Test for api calls', () => {
  const instance = wrapper.instance();
  it('Should test for makeRequestForToken method', () => {
    jest.spyOn(instance, 'makeRequestForToken');
    instance.makeRequestForToken(
      [30.3752011, 76.78212200000007],
      [30.2752852, 77.04757999999993]
    );
    expect(instance.makeRequestForToken).toHaveBeenCalled();
  });

  it('Should test for makeRequestForRoute method', () => {
    jest.spyOn(instance, 'makeRequestForRoute');
    instance.makeRequestForRoute('/route/token');
    expect(instance.makeRequestForRoute).toHaveBeenCalled();
  });
});
