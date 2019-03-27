import React, { Component } from 'react';
import './AppBody.css';
import LeftPanel from '../../components/LeftPanel/LeftPanel';
import RightPanel from '../../components/RightPanel/RightPanel';

class AppBody extends Component {
    constructor(props) {
        super(props);
        this.state = { start: '', drop: '', errorMessage: '' };
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const field = target.id;

        this.setState({
            [field]: value
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

    render() {
        console.log(JSON.stringify(this.state))
        return (
            <div className="app-body-container">
                <div className="row">
                    <LeftPanel handleChange={this.handleChange}
                        handleSubmit={this.handleSubmit}
                        handleReset={this.handleReset}
                        {...this.state} />
                    <RightPanel />
                </div>
            </div>
        );
    }
}

export default AppBody;