import {addressAPI} from "../API/addressApi";


const SET_SUGGESTIONS = 'SET_SUGGESTIONS';
const SET_ADDRESS = 'SET_ADDRESS';

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
        postalCode: '',
        regionType: '',
        region: '',
        // regionNameWithType: '',
        cityType: '',
        city: '',
        // cityNameWithType:'',
        settlementType: '',
        settlement: '',
        // settlementNameWithType: '',
        streetType: '',
        street: '',
        // streetNameWithType: '',
        houseType: '',
        house: '',
        // houseWithType: ''
    },
    userAddress: {
        region: '',
        city: '',
        street: '',
        house: '',
        flat: '',
        postalCode: ''
    }
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
            debugger
            return {
                ...state,
                currentAddress: action.currentAddress,
                fullCurrentAddress: action.fullCurrentAddress
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

// function mapResponseSuggestionToOptionalSuggestion(response) {
//     //TODO suggestions -> полную строчку + профверка на null + если null, то пустота
//
//         // let filteredResponse = response.map((s) =>
//         // {
//         //         {country: s.data.country}
//         //         {regionName: s.data.region}
//         //         {regionType: s.data.region_type_full}
//         //         {cityType: s.data.city_type_full}
//         //         {cityName: s.data.city}
//         //         {settlementType: s.data.settlement_type_full}
//         //         {settlementName: s.data.settlement}
//         //         {streetType: s.data.street_type_full}
//         //         {streetName: s.data.street}
//         //         {houseType: s.data.house_type}
//         //         {house: s.data.house}
//         //         {blockType: s.data.block_type}
//         //         {block: s.data.block}
//         //         {entrance: s.data.entrance}
//         //         {floor: s.data.floor}
//         //         {flatType: s.data.flat_type_full}
//         //         {flat: s.data.flat}
//         // }
//     // )
//     debugger
// return filteredResponse
// }

export const getSuggestion = (textFromField) => async (dispatch) => {

        let response = await addressAPI.getSuggestion(textFromField);
        let filteredResponse;
        if (response !== null) {
            filteredResponse = response.map((s) => {
                    return {
                        country: s.data.country,
                        postalCode: s.data.postal_code,
                        regionNameWithType: s.data.region_with_type,
                        cityNameWithType: s.data.city_with_type,
                        settlementNameWithType: s.data.settlement_with_type,
                        streetNameWithType: s.data.street_with_type,
                        houseWithType: s.data.house === null ? null : s.data.house_type + ' ' + s.data.house
                    }
                }
            )
            console.log(response)
            dispatch(setSuggestionActionCreator(filteredResponse));
        }
    }
;

export const getAddress = (textFromField) => async (dispatch) => {

    let response = await addressAPI.getAddress(textFromField);
    if (response.data.suggestions.length > 0) {
        let currentAddress = response.value;

        let fullCurrentAddress = {
            country: response.data.country,
            region: response.data.region_with_type,
            city: response.data.city_with_type || response.data.settlement_with_type,
            street: response.data.street_with_type,
            house: response.data.house ? response.data.house_type + ' ' + response.data.house : null,
            flat: response.data.flat ? response.data.flat_type + ' ' + response.data.flat : null,
            postalCode: response.data.postalCode
        }

        dispatch(setCurrentAddressActionCreator(currentAddress, fullCurrentAddress));
    } else {

        dispatch(setCurrentAddressActionCreator(textFromField, ))
    }

}

export default addressReducer;