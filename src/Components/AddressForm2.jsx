import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import {Button, Container, Grid, IconButton} from "@mui/material";
import styled from 'styled-components'
import AddressEditMode from "./AddressEditMode";
import {useState} from "react";
import EditIcon from '@mui/icons-material/Edit';
import {theme} from "../Theme/theme";

export default function AddressForm2(props) {


    const [isEditMode, setEditMode] = useState(false);
    const [isAddressCompleted, setIsAddressCompleted] = useState(false);

    let ResultBlock = styled.div`
      width: 100%;
      margin: 25px 0;
    display: flex;
    flex-direction: row;
    align-items: center`

    const onSubmit = (e) => {
        let text = e.currentTarget.parentElement.children[0].children[0].children[0].children[0].value;
        text.length > 0 && setAddress(text) && setIsAddressCompleted(true);

    }

    let setAddress = (text) => {
        props.setAddress(text);
        setIsAddressCompleted(true)
    }

    let turnEditMode = () => {
        setEditMode(!isEditMode);
    }

    let createSuggestionLine = (suggestions) => {
        let entries = suggestions.map((s) => Object.entries(s))
        console.log(entries)
        let lines = (entries.map((l) => l.map((i) => i[1])))
        console.log(lines)
        return lines
    }

    let handleChange = (event, value) => {
        let id = event.currentTarget.id;
        let bound;
        if (id.indexOf("region") > 0) {
            bound = 'region'
        }
        id.indexOf("region") > 0 ?  props.getBoundarySuggestion(value, bound) : props.getSuggestion(value);
    }

    return (<Container>
            <Stack direction="row" spacing={1} margin={'0 auto 20px'}>
                <Autocomplete
                    fullWidth
                    freeSolo
                    id="free-solo-2-demo"
                    disableClearable
                    options={createSuggestionLine(props.filteredSuggestions).map((s) => s.join(", "))}
                    onInputChange={handleChange}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label=""
                            InputProps={{
                                ...params.InputProps,
                                type: 'search',
                            }}
                        />
                    )}
                />
                <Button onClick={onSubmit} disableRipple={true} variant={"contained"}>Далее</Button>
            </Stack>
        {isAddressCompleted && <ResultBlock>
            <h3>
                Вы выбрали {props.currentAddress}
            </h3>
            <IconButton onClick={turnEditMode} sx={{marginLeft: '20px'}} color={"primary"} variant={"text"}><EditIcon/></IconButton>
        </ResultBlock>}
        {isEditMode && <AddressEditMode fullCurrentAddress={props.fullCurrentAddress}
                                        regionSuggestions = {props.regionSuggestions}
                                        handleChange = {handleChange}/>}
        </Container>


    );
}
