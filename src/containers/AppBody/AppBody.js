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
        this.state = { start: '', drop: '', errorMessage: '', mapLoaded: false };
    }

    handleChange = (key, value) => {
        this.setState({
            [key]: value
        });
    }

    getCords = (obj) => [obj.lat, obj.lng];

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
            this.setState({
                errorMessage: ''
            })
                })
                .catch((response) => {
                    this.setState({
                        errorMessage: 'Something went wrong! Please try again in some time.'
                    })
                });
        } else {
            this.setState({
                errorMessage: 'Both starting point and drop-off location are mandatory!'
            })
        }
    }

    handleReset = (event) => {
        alert('Form reset');
        this.setState({ start: '', drop: '', errorMessage: '' });
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
                            {...this.state} />
                    </LocationsContext.Provider>
                    <RightPanel mapLoaded={this.state.mapLoaded} />
                </div>
            </div>
        );
    }
}

export default AppBody;