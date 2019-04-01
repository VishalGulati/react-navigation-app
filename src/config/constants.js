const GOOGLE_MAP_API = 'https://maps.googleapis.com/maps/api/js?key=';

export const GOOGLE_API_URL =
  GOOGLE_MAP_API + process.env.REACT_APP_GOOGLE_API_KEY;

export const DEFAULT_APP_STATE = {
  start: '',
  drop: '',
  message: '',
  messageType: '',
  mapLoaded: false,
  resetPending: false,
  showRoute: false,
  route: null,
  submitBtnLabel: 'Submit'
};

export const ERROR_MESSAGES = {
  serviceError: 'Something went wrong! Please try again in some time.',
  uiValidationError: 'Both starting location and drop-off point are mandatory!'
};

export const IN_PROGRESS_STATUS = 'in progress';
