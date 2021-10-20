import React from "react";
import AddressForm from "./AddressForm";
import {connect} from "react-redux";
import {getAddress, getBoundarySuggestion, getRegionSuggestion, getSuggestion} from "../redux/addressReducer";
import AddressForm2 from "./AddressForm2";

class AddressFormContainer extends React.Component {

    render() {
        return <AddressForm2 suggestions={this.props.suggestions}
                             regionSuggestions={this.props.regionSuggestions}
                             filteredSuggestions={this.props.filteredSuggestions}
                             currentAddress={this.props.currentAddress}
                             fullCurrentAddress={this.props.fullCurrentAddress}
                             getSuggestion={this.props.getSuggestion}
                             setAddress={this.props.setAddress}
        />
    }
}

let mapStateToProps = (store) => ({
    suggestions: store.addressForm.suggestions,
    regionSuggestions: store.addressForm.regionSuggestions,
    filteredSuggestions: store.addressForm.filteredSuggestions,
    currentAddress: store.addressForm.currentAddress,
    fullCurrentAddress: store.addressForm.fullCurrentAddress
})

let mapDispatchToProps = (dispatch) => {
    return {
        getSuggestion: (textFromField) => {
            dispatch(getSuggestion(textFromField));
        },
        setAddress: (textFromField) => {
            dispatch(getAddress(textFromField))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressFormContainer);