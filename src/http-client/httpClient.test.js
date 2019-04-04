import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import requestGenerator, { API } from './httpClient';
// This sets the mock adapter on the default instance
const mock = new MockAdapter(API);

const mockDirectionResponse = {
  status: 'success',
  path: [
    ['22.372081', '114.107877'],
    ['22.326442', '114.167811'],
    ['22.284419', '114.159510']
  ],
  total_distance: 20000,
  total_time: 1800
};

const mockTokenResponse = {
  token: 'token'
};

describe('Test for api calls', () => {
  it('Should test for getReq method with 200', async () => {
    mock.onGet('/route').reply(200, mockTokenResponse);
    const response = await requestGenerator.getReq('/route');
    expect(response.data).toEqual(mockTokenResponse);
  });
  it('Should test for postReq method for route as response', async () => {
    mock.onPost('/route/token').reply(200, mockDirectionResponse);
    const response = await requestGenerator.postReq('/route/token');
    expect(response.data).toEqual(mockDirectionResponse);
  });
  it('Should test for postReq method for Location not reachable by car', async () => {
    const mockDirectionResponse = {
      status: 'failure',
      error: 'Location not accessible by car'
    };
    mock.onPost('/route/token').reply(200, mockDirectionResponse);
    const response = await requestGenerator.postReq('/route/token');
    expect(response.data).toEqual(mockDirectionResponse);
  });
});
