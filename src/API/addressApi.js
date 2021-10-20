import * as axios from "axios";

let url;
let token = "f8283137fc939eb3d1d8ae3b999953a4104e7af4";
// let secret = "f7bdabeb71f8623e7a09fe206ad24c9224693bc8";
let query;
// let from_bound;
// let to_bound;

let createQuery = (text) => JSON.stringify({query: text})

export const addressAPI = {
    getSuggestion(textFromField) {
        url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
        query = createQuery(textFromField);
        let config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Token " + token
            }
        }
        return axios.post(url, query, config)
            .then(response => {

                return  response.data.suggestions.length > 0 ? response.data.suggestions : null;
            });
    },

    getAddress(textFromField) {
        url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
        query = createQuery(textFromField);
        let config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Token " + token
            },
        }
        return axios.post(url, query, config)
            .then(response => {
                return response.data.suggestions[0];
            });
    },

};