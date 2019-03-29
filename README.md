# REACT NAVIGATION APP

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

## Major Functionalities of the application 

1. Get one pickup location and one drop-off location from the user and submit them to the Mock API. Furthermore, this app makes sure that:
	- API usage must be in accordance with the documentation.
	- Errors are handled.
	- Automatic retries are made when the backend is busy.
2. Addresses autocomplete.
3. It displays the driving route returned from the API, **in the correct order**, on [Google Maps](https://developers.google.com/maps/).
4. The application is responsive and renders well on all devices.

## Adding you GOOGLE MAPS API key:

API Key for using google maps is not included in the source code, instead the same has to be added by user in following file:
  **src/config/constants.js** - In this file, there is a constant declared on line 3 i.e. GOOGLE_API_KEY. This constant has to be set to the API key for using this application.
