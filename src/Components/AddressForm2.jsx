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
import {setEditedAddressActionCreator} from "../redux/addressReducer";
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

export default function AddressForm2(props) {


    const [firstStepEditing, setFirstStepEditing] = useState(true);
    const [secondStepEditing, setSecondStepEditing] = useState(false);
    const [isEditMode, setEditMode] = useState(false);
    const [isAddressCompleted, setIsAddressCompleted] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    let addressDetail = {
        region: props.fullCurrentAddress.region || props.editedAddress.region || "",
        city: props.fullCurrentAddress.city || props.editedAddress.city || "",
        street: props.fullCurrentAddress.street || props.editedAddress.street || "",
        house: props.fullCurrentAddress.house || props.editedAddress.house || "",
        flat: props.fullCurrentAddress.flat || props.editedAddress.flat || "",
        postalCode: props.fullCurrentAddress.postalCode || props.editedAddress.postalCode || "",
    }

    let ResultBlock = styled.div`
      width: 100%;
      margin: 25px 0;
      display: flex;
      flex-direction: row;
      align-items: center`

    let SuccessBlock = styled.div`
      width: 100%;
      margin: 100px auto 0;
      display: flex;
      flex-direction: column;
      align-items: center`

    const onSubmitSearch = (e) => {

        let text = e.currentTarget.parentElement.children[0].children[0].children[0].children[0].value;
        text.length > 0 && setAddress(text);
        setFirstStepEditing(false);
        setSecondStepEditing(true)
    }

    const onSubmitEdit = (e) => {
        let isEmptyFields = Object.values(addressDetail).find(field => !field.length > 0);
        if (isEmptyFields) {
            debugger
            props.setEditMode(true);
        } else {
            props.setEditedAddress(addressDetail);
            setEditMode(false);
            setIsAddressCompleted(true);
            setSecondStepEditing(false)
        }
    }

    let setAddress = (text) => {
        props.setAddress(text);
    }

    let turnEditMode = () => {
        setIsAddressCompleted(false)
        setEditMode(!isEditMode);
        setSecondStepEditing(true)
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
        id.indexOf("region") > 0 ? props.getBoundarySuggestion(value, bound) : props.getSuggestion(value);
    }

    const finishEditing = () => {
        setIsSuccess(true)
    }

    return (<Container>
            {!isSuccess ? <div>
                    {firstStepEditing && <Stack direction="row" spacing={1} margin={'0 auto 20px'}>
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
                        <Button onClick={onSubmitSearch} disableRipple={true} variant={"contained"}>Далее</Button>
                    </Stack>}
                    {props.currentAddress && <ResultBlock>
                        <h3>
                            Вы
                            выбрали: <i>
                                 {props.editedAddress.region ? props.editedAddress.region + ', ' + props.editedAddress.city + ', ул ' + props.editedAddress.street
                                    + ', д ' + props.editedAddress.house + ', кв ' + props.editedAddress.flat : props.currentAddress}
                        </i>

                        </h3>
                        <IconButton onClick={turnEditMode} sx={{marginLeft: '20px'}} color={"primary"}
                                    variant={"text"}><EditIcon/></IconButton>
                    </ResultBlock>}
                    {isEditMode && <AddressEditMode fullCurrentAddress={props.fullCurrentAddress}
                                                    regionSuggestions={props.regionSuggestions}
                                                    setAddress={props.setAddress}
                                                    editedAddress={props.editedAddress}
                                                    handleChange={handleChange}
                                                    setEditedAddress={props.setEditedAddress}
                                                    setEditMode={setEditMode}
                                                    setIsAddressCompleted={setIsAddressCompleted}
                                                    onSubmitEdit={onSubmitEdit}
                                                    addressDetail={addressDetail}
                    />}
                    {isEditMode && <Button disableRipple={true}
                                           onClick={onSubmitEdit}
                                           variant={"contained"}>Сохранить</Button>}
                    {isAddressCompleted &&
                    <Button disableRipple={true} onClick={finishEditing} variant={"contained"}>Завершить</Button>}

                </div>
                :
                <SuccessBlock>
                    <h2>Все поля успешно заполнены</h2>
                    <CheckCircleRoundedIcon fontSize={"large"} sx={{margin: '25px'}} color={'success'}/>
                    <h4>
                        Вы
                        выбрали: </h4>
                    <h3>
                        <i>
                            {props.editedAddress.region ? props.editedAddress.region + ', ' + props.editedAddress.city + ', ул ' + props.editedAddress.street
                                + ', д ' + props.editedAddress.house + ', кв ' + props.editedAddress.flat : props.currentAddress}
                        </i>
                    </h3>

                </SuccessBlock>
            }

        </Container>


    );
}
