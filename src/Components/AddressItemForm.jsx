import React, {useState} from "react";
import TextField from "@mui/material/TextField";


const AddressItemForm = (props) => {

    const [line, setLine] = useState(props.defaultValue);
    const [error, setError] = useState(props.error);


    const onBlur = (e) => {
        if (line.length > 0) {
            setError(false);
            props.getLines(e);
        } else {
            setError(true);
        }
    }

    const onChange = (e) => {
        setError(!line.length > 0)
        setLine(e.currentTarget.value);
    }


    return (
        <TextField
            id={props.id}
            size={"small"}
            autoFocus
            error={error}
            helperText={error && 'Обязательно для заполнения'}
            onBlur={onBlur}
            onChange={onChange}
            defaultValue={line}
        />
    )
}

export default AddressItemForm;