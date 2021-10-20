import React from "react";
import AddressForm from "./AddressForm";
import {connect} from "react-redux";
import {getAddress, getSuggestion, setEditedAddressActionCreator} from "../redux/addressReducer";
import AddressForm2 from "./AddressForm2";

class AddressFormContainer extends React.Component {

    render() {
        return <AddressForm2 suggestions={this.props.suggestions}
                             filteredSuggestions={this.props.filteredSuggestions}
                             currentAddress={this.props.currentAddress}
                             fullCurrentAddress={this.props.fullCurrentAddress}
                             getSuggestion={this.props.getSuggestion}
                             setAddress={this.props.setAddress}
                             editedAddress={this.props.editedAddress}
                             setEditedAddress={this.props.setEditedAddress}
        />
    }
}

let mapStateToProps = (store) => ({
    suggestions: store.addressForm.suggestions,
    filteredSuggestions: store.addressForm.filteredSuggestions,
    currentAddress: store.addressForm.currentAddress,
    fullCurrentAddress: store.addressForm.fullCurrentAddress,
    editedAddress: store.addressForm.editedAddress
})

let mapDispatchToProps = (dispatch) => {
    return {
        getSuggestion: (textFromField) => {
            dispatch(getSuggestion(textFromField));
        },
        setAddress: (textFromField) => {
            dispatch(getAddress(textFromField))
        },
        setEditedAddress: (address) => {
            dispatch(setEditedAddressActionCreator(address))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressFormContainer);