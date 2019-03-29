import React, { Component } from 'react';
import './LeftPanel.css';
import PropTypes from 'prop-types';
import FormGroup from '../FormGroup/FormGroup';
import Message from '../Message/Message';

/**
 * The Left panel of the application that contains the search form.
 */
class LeftPanel extends Component {
    componentDidUpdate() {
        if (this.props.resetPending) {
            this.myFormRef.reset();
            this.props.resetDone();
        }
    }
    render() {
        return (
            <div className="col-xs-12 col-md-4 left-panel">
                <form onSubmit={this.props.handleSubmit} ref={(el) => this.myFormRef = el}>
                    <FormGroup inputId="start"
                        label="Starting location" />
                    <FormGroup inputId="drop"
                        label="Drop-off point" />
                    <Message message={this.props.message} messageType={this.props.messageType} />
                    <button type="button" className="btn btn-primary lp-btn"
                        disabled={this.props.submitBtnLabel === 'Loading...'}
                        onClick={this.props.handleSubmit}>
                        {this.props.submitBtnLabel}
                    </button>
                    <button type="button" className="btn btn-secondary lp-btn" onClick={this.props.handleReset}>
                        Reset
                    </button>
                </form>
            </div>
        );
    }
}


LeftPanel.propTypes = {
    message: PropTypes.string,
    messageType: PropTypes.string,
    submitBtnLabel: PropTypes.string,
    mapLoaded: PropTypes.bool,
    handleSubmit: PropTypes.func,
    handleReset: PropTypes.func
};

export default LeftPanel;