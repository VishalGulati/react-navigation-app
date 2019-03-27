import React, { Component } from 'react';
import './AppBody.css';
import LeftPanel from '../../components/LeftPanel/LeftPanel';
import RightPanel from '../../components/RightPanel/RightPanel';
import LocationsContext from '../../context/LocationsContext';
import {GOOGLE_API_URL} from '../../config/constants';

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

    handleSubmit = (event) => {
        const { start, drop } = this.state;
        if (start && drop) {
            alert('Form submitted');
        } else {
            this.setState({
                errorMessage: 'Both starting point and drop-off location are mandatory!'
            })
        }
        event.preventDefault();
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