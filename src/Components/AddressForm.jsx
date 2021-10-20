import * as React from 'react';
import {useState} from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import {Button, Container, IconButton, Typography} from "@mui/material";
import styled from 'styled-components'
import AddressEditMode from "./AddressEditMode";
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

export default function AddressForm(props) {

    const [firstStepEditing, setFirstStepEditing] = useState(true);
    const [secondStepEditing, setSecondStepEditing] = useState(false);
    const [isEditMode, setEditMode] = useState(false);
    const [isAddressCompleted, setIsAddressCompleted] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

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
        //Получение значения из Autocomplete
        let text = e.currentTarget.parentElement.children[0].children[0].children[0].children[0].value;
        text.length > 0 && setAddress(text);
        setFirstStepEditing(false);
        setSecondStepEditing(true);
    }

    let setAddress = (text) => {
        props.setAddress(text);
    }

    let turnEditMode = () => {
        setIsAddressCompleted(false)
        setEditMode(!isEditMode);
    }

    let createSuggestionLine = (suggestions) => {
        let entries = suggestions.map((s) => Object.entries(s))
        return (entries.map((l) => l.map((i) => i[1])))
    }

    let onInputChange = (event, value) => {
        props.getSuggestion(value);
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
                            disableClearable
                            options={createSuggestionLine(props.filteredSuggestions).map((s) => s.join(", "))}
                            onInputChange={onInputChange}
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
                    {secondStepEditing && <ResultBlock>
                        <Typography variant={"h2"}>
                            Вы
                            выбрали: <i>
                            {props.currentAddress}
                        </i>

                        </Typography>
                        <IconButton onClick={turnEditMode} sx={{marginLeft: '20px'}} color={"primary"}
                                    variant={"text"}><EditIcon/></IconButton>
                    </ResultBlock>}
                    {isEditMode && <AddressEditMode fullCurrentAddress={props.fullCurrentAddress}
                                                    regionSuggestions={props.regionSuggestions}
                                                    setAddress={props.setAddress}
                                                    editedAddress={props.editedAddress}
                                                    setEditedAddress={props.setEditedAddress}
                                                    setEditMode={setEditMode}
                                                    setIsAddressCompleted={setIsAddressCompleted}
                    />}
                    {isAddressCompleted &&
                    <Button disableRipple={true} onClick={finishEditing} variant={"contained"}>Завершить</Button>}

                </div>
                :
                <SuccessBlock>
                    <h2>Все поля успешно заполнены</h2>
                    <CheckCircleRoundedIcon fontSize={"large"} sx={{margin: '25px'}} color={'success'}/>
                    <Typography variant={"h2"}>
                        Вы
                        выбрали: </Typography>
                    <Typography marginTop={'10px'} variant={"h3"}>
                        <i>
                            {props.currentAddress}
                        </i>
                    </Typography>

                </SuccessBlock>
            }

        </Container>


    );
}
