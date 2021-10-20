import {addressAPI} from "../API/addressApi";


const SET_SUGGESTIONS = 'SET_SUGGESTIONS';
const SET_ADDRESS = 'SET_ADDRESS';
const SET_EDITED_ADDRESS = 'SET_EDITED_ADDRESS';

let filterSuggestions = (suggestions) => {
    let filteredSuggestions = [];

    suggestions.length > 0 &&
    suggestions.forEach((s) => {
        filteredSuggestions.push(Object.fromEntries(Object.entries(s)
            .filter((i) => i[0] !== 'postalCode' && i[0] !== 'country' && i[1] !== null)))
    });
    return filteredSuggestions
};

let initialState = {
    suggestions: [],
    filteredSuggestions: [],
    currentAddress: '',
    fullCurrentAddress: {
        country: '',
        region: '',
        city: '',
        street: '',
        house: '',
        flat: '',
        postalCode: ''
    },
    editedAddress: {}
};


const addressReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SUGGESTIONS:
            return {
                ...state,
                suggestions: action.suggestions,
                filteredSuggestions: action.suggestions ? filterSuggestions(action.suggestions) : state.suggestions
            }
        case SET_ADDRESS:

            return {
                ...state,
                currentAddress: action.currentAddress,
                fullCurrentAddress: action.fullCurrentAddress
            }
        case SET_EDITED_ADDRESS:
            debugger
            return {
                ...state,
                editedAddress: action.address,
                currentAddress: action.address.region + ', ' + action.address.city + ', ' + action.address.street
                    + ', д ' + action.address.house + ', кв ' + action.address.flat + ', индекс ' + action.address.postalCode

            }

        default:
            return state
    }
}

export const setSuggestionActionCreator = (suggestions) => ({type: SET_SUGGESTIONS, suggestions});
export const setCurrentAddressActionCreator = (currentAddress, fullCurrentAddress) => ({
    type: SET_ADDRESS,
    currentAddress,
    fullCurrentAddress
});
export const setEditedAddressActionCreator = (address) => ({type: SET_EDITED_ADDRESS, address});

export const getSuggestion = (textFromField) => async (dispatch) => {

    let response = await addressAPI.getSuggestion(textFromField);
    let suggestions = response.data.suggestions;
    if (suggestions.length > 0) {
        let filteredResponse = suggestions.map((s) => {
                let data = s.data;
                return {
                    country: data.country,
                    postalCode: data.postal_code,
                    regionNameWithType: data.region_with_type,
                    cityNameWithType: data.city_with_type,
                    settlementNameWithType: data.settlement_with_type,
                    streetNameWithType: data.street_with_type,
                    houseWithType: data.house === null ? null : ' ' + data.house
                }
            }
            )
            dispatch(setSuggestionActionCreator(filteredResponse));
        }
    }
;

export const getAddress = (textFromField) => async (dispatch) => {

    let response = await addressAPI.getSuggestion(textFromField);
    let currentAddress = '';
    let fullCurrentAddress = {
        country: '',
        region: '',
        city: '',
        street: '',
        house: '',
        flat: '',
        postalCode: ''
    }
    let suggestions = response.data.suggestions;
    if (suggestions.length > 0) {
        currentAddress = suggestions[0].value;
        let data = suggestions[0].data;
        fullCurrentAddress = {
            country: data.country,
            region: data.region_with_type,
            city: data.city_with_type || data.settlement_with_type,
            street: data.street_with_type,
            house: data.house ? data.house : null,
            flat: data.flat ? +data.flat : null,
            postalCode: data.postalCode
        }
        dispatch(setCurrentAddressActionCreator(currentAddress, fullCurrentAddress));
    } else {
        dispatch(setCurrentAddressActionCreator(currentAddress, fullCurrentAddress))
    }

}

export default addressReducer;