const GOOGLE_MAP_API = 'https://maps.googleapis.com/maps/api/js?key=';

export const getApiUrl = () =>
  process.env.REACT_APP_GOOGLE_API_KEY
    ? GOOGLE_MAP_API + process.env.REACT_APP_GOOGLE_API_KEY
    : null;

export const RETRY_COUNTER = 1;

export const DEFAULT_APP_STATE = {
  start: '',
  drop: '',
  message: '',
  messageType: '',
  mapLoaded: false,
  resetPending: false,
  showRoute: false,
  route: null,
  isLoading: false,
  isDirty: false,
  retryCounter: RETRY_COUNTER
};

export const ERROR_MESSAGES = {
  serviceError: 'Something went wrong! Please try again in some time.',
  uiValidationError: 'Both starting location and drop-off point are mandatory!',
  appNotLoaded:
    'Failed to load app. Please make sure Google maps API key is added in .env file.',
  retryFailure:
    'Server did not respond even on retry. Please try again in some time'
};

export const IN_PROGRESS_STATUS = 'in progress';
export const API_STATUS = {
  success: 'success',
  progress: 'in progress',
  failure: 'failure'
};
