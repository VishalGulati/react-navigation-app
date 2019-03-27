import React from 'react';
import PropTypes from 'prop-types';

class AutoCompleteInput extends Component {
    constructor(props) {
        super(props);
        this.autocompleteInput = React.createRef();
        this.autocomplete = null;
    }

    componentDidMount() {
        this.autocomplete = new google.maps.places.Autocomplete(
            this.autocompleteInput.current,
            { types: ["geocode"] }
        );
        this.autocomplete.addListener("place_changed", this.handlePlaceChanged);
    }

    handlePlaceChanged = () => {
        const place = this.autocomplete.getPlace();
    }

    render() {
        return (
            <input type="text"
                ref={this.autocompleteInput}
                className="form-control"
                id={this.props.inputId}
                value={this.props.value}
                onChange={this.props.handleChange} />
        );
    }
}

AutoCompleteInput.propTypes = {
    inputId: PropTypes.string,
    value: PropTypes.string,
    handleChange: PropTypes.func
};

export default AutoCompleteInput;