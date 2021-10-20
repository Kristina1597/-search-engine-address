import React, {useState} from "react";
import TextField from "@mui/material/TextField";


const AddressItemForm = (props) => {

    const [line, setLine] = useState('');

    const onBlur = (e) => {
        console.log("Saving in local state")
        if (line.length) {
            props.getLines(e)
        }
    }

    const onChange = (e) => {
        setLine(e.currentTarget.value)
    }

    return (
        <TextField id={props.id}
                   size={"small"}
                   autoFocus
                   onBlur={onBlur}
                   onChange={onChange}
                   defaultValue={props.defaultValue}
        />
    )
}

export default AddressItemForm;