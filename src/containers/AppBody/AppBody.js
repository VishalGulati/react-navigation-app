import React, { Component } from 'react';
import './AppBody.css';
import LeftPanel from '../../components/LeftPanel/LeftPanel';
import RightPanel from '../../components/RightPanel/RightPanel';
import LocationsContext from '../../context/LocationsContext';
import { GOOGLE_API_URL } from '../../config/constants';
import API from '../../axios/AxiosLauncher';
import { URLS } from '../../config/endpoints';

class AppBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            start: '', drop: '', message: '', messageType: '',
            mapLoaded: false, resetPending: false, showRoute: false,
            route: null
        };
    }

    handleChange = (key, value) => {
        this.setState({
            [key]: value
        });
    }

    getCords = (obj) => [obj.lat, obj.lng];

    checkForUnsuccessfulMsg = (response) => {
        switch (response.data.status) {
            case 'success':
                return '';
            case 'failure':
                return response.data.error;
            default:
                return response.data.status;
        }
    }

    setMessageInState = (msg, msgType = '') => {
        this.setState({
            message: msg,
            messageType: msgType
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { start, drop } = this.state;
        if (start && drop) {
            console.log('Form submitted');
            const origin = this.getCords(JSON.parse(JSON.stringify(this.state.start))),
                destination = this.getCords(JSON.parse(JSON.stringify(this.state.drop)));
            API.post(URLS.submit, { origin, destination })
                .then((result) => {
                    console.log(result);
                    const token = result && (result.data && result.data.token);
                    const endpoint = URLS.getRoute.replace("{token}", token);
                    return API.get(endpoint);
                })
                .then((result) => {
                    console.log(result);
                    const unsuccessfulMsg = this.checkForUnsuccessfulMsg(result);
                    if (unsuccessfulMsg) {
                        this.setMessageInState('Server responded with: ' + unsuccessfulMsg, 'error');
                    } else {
                        const { total_distance, total_time } = result.data
                        this.setMessageInState('total distance: ' + total_distance + ' & ' +
                            'total time: ' + total_time);
                        this.setState({ showRoute: true, route: result.data.path });
                    }
                })
                .catch((response) => {
                    this.setMessageInState('Something went wrong! Please try again in some time.', 'error');
                });
        } else {
            this.setMessageInState('Both starting point and drop-off location are mandatory!', 'error');
        }
    }

    resetDone = () => {
        this.setState({ resetPending: false });
    }

    handleReset = (event) => {
        this.setState({ start: '', drop: '', message: '', resetPending: true });
    }

    initMap = () => {
        this.setState({ mapLoaded: true });
    }

    componentDidMount() {
        window.initMap = this.initMap;
        window.loadJS(`${GOOGLE_API_URL}&libraries=places&callback=initMap`)
    }

    render() {
        console.log(JSON.stringify(this.state))
        return (
            <div className="app-body-container">
                <div className="row">
                    <LocationsContext.Provider value={{
                        mapLoaded: this.state.mapLoaded,
                        updateLocation: this.handleChange
                    }}>
                        <LeftPanel
                            handleSubmit={this.handleSubmit}
                            handleReset={this.handleReset}
                            resetDone={this.resetDone}
                            {...this.state} />
                    </LocationsContext.Provider>
                    <RightPanel
                        mapLoaded={this.state.mapLoaded}
                        showRoute={this.state.showRoute}
                        route={this.state.route} />
                </div>
            </div>
        );
    }
}

export default AppBody;