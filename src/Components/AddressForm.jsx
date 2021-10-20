import {Autocomplete, Button, TextField, Typography} from "@mui/material";
import {Container} from "@material-ui/core";
import {useRef, useState} from "react";
import {theme} from "../Theme/theme";
import styled from "styled-components";

let cities = ['Moscow', 'Rome', 'Sochi', 'Barselona', 'Chicago'];

const AddressForm = (props) => {
    const AddressFormWrap = styled.div`
      display: flex;
      flex-direction: row;
      width: 100%;
      justify-content: space-between;
      align-items: center;
    `
    console.log(props)

    const [editMode, setEditMode] = useState(false);
    const [fieldValue, setFieldValue] = useState(null);
    const [fillingAddressCompleted, setFillingAddressCompleted] = useState(false);
    const [firstFillingAddressCompleted, setFirstFillingAddressCompleted] = useState(false);

    console.log(fieldValue)

    const getSuggestion = (value) => {
        props.getSuggestion(value);
    }

    const handleChange = (event, newValue) => {
        if (typeof newValue === 'string' && newValue !== fieldValue) {
            setFieldValue(newValue);
            getSuggestion(newValue);
        }


        // if (e !== null) {
        //     let value = e.target.value;
        //     setFieldValue(value);
        //     console.log(value);
        // }
    }

    const handleSubmit = (e) => {
        console.log(e.target.value)
    }

    return (
        <Container maxWidth={"md"}>
            {!fillingAddressCompleted &&
            <div>
                <Typography variant={'h2'}>
                    Адрес
                </Typography>
                {/*<form onSubmit={handleSubmit}></form>*/}
                <AddressFormWrap>
                    <Autocomplete
                        autoComplete
                        value={fieldValue}
                        onInputChange={handleChange}
                        // onInputChange={handleChange}
                        // onInputChange={getSuggestion}
                        sx={{width: '82%'}}

                        freeSolo
                        id="combo-box-demo"
                        options={props.suggestions.map((s) => <div>{s}</div>)}
                        getOptionLabel={(option) => option ? option : ""}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <Button sx={{width: '17%', height: '60px'}}
                            clearOnEscape variant={"contained"}
                            disableRipple={true}
                            color={"primary"}
                            onClick={getSuggestion}>{}Далее</Button>
                </AddressFormWrap>
                {firstFillingAddressCompleted &&
                <Typography variant={'h2'}>
                    Вы выбрали адрес ...
                </Typography>
                }
            </div>


            }
        </Container>
    )


};

export default AddressForm;