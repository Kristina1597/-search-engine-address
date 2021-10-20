import * as axios from "axios";

let url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
let token = "f8283137fc939eb3d1d8ae3b999953a4104e7af4";

let createQuery = (text) => JSON.stringify({query: text})

export const addressAPI = {
    getSuggestion(textFromField) {
        let config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Token " + token
            }
        }
        return axios.post(url, createQuery(textFromField), config)
            .then(response => {
                return response;
            });
    },
};