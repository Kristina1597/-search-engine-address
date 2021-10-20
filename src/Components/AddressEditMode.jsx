import React from "react";
import {Button, Grid} from "@mui/material";
import styled from "styled-components";
import AddressItemForm from "./AddressItemForm";


const AddressEditMode = (props) => {

    let addressDetail = {
        region: props.fullCurrentAddress.region || props.editedAddress.region || "",
        city: props.fullCurrentAddress.city || props.editedAddress.city || "",
        street: props.fullCurrentAddress.street || props.editedAddress.street || "",
        house: props.fullCurrentAddress.house || props.editedAddress.house || "",
        flat: props.fullCurrentAddress.flat || props.editedAddress.flat || "",
        postalCode: props.fullCurrentAddress.postalCode || props.editedAddress.postalCode || "",
    }

    const getLines = (e) => {
        switch (e.currentTarget.id) {
            case 'region':
                addressDetail.region = e.target.value;
                break
            case 'city':
                addressDetail.city = e.target.value;
                break
            case 'street':
                addressDetail.street = e.target.value;
                break
            case 'house':
                addressDetail.house = e.target.value;
                break
            case 'flat':
                addressDetail.flat = e.target.value;
                break
            case 'postalCode':
                addressDetail.postalCode = e.target.value;
                break
            default :
                break;
        }

    }

    const onSubmit = () => {
        console.log(addressDetail)
        let isAllFieldsFilled = Object.values(addressDetail).some(field => field.length === 0);
        if (isAllFieldsFilled) {
            props.setEditMode(true);
            alert("Не все поля заполнены!")
        } else {
            props.setEditedAddress(addressDetail);
            props.setEditMode(false);
            props.setIsAddressCompleted(true);
        }
    }


    let Item = styled.div`
      margin: 10px 0;
    `;

    let Title = styled.h3`
      margin-bottom: 10px;
    `;
    const isFieldNotEmpty = (line) => line === '';

    return (<div>
            <Grid marginBottom={'30px'} container spacing={2} justifyContent={"space-between"}>
                <Grid item xs={6}>
                    <Item>
                        <Title>Регион</Title>
                        <AddressItemForm id={'region'}
                                         getLines={getLines}
                                         error={isFieldNotEmpty(addressDetail.region)}
                                         defaultValue={addressDetail.region}
                        />
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>
                        <Title>Населенный пункт</Title>
                        <AddressItemForm id={'city'}
                                         getLines={getLines}
                                         error={isFieldNotEmpty(addressDetail.city)}
                                         defaultValue={addressDetail.city}
                        />
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>
                        <Title>Улица</Title>
                        <AddressItemForm id={'street'}
                                         getLines={getLines}
                                         error={isFieldNotEmpty(addressDetail.street)}
                                         defaultValue={addressDetail.street}
                        />
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>
                        <Title>Дом</Title>
                        <AddressItemForm id={'house'}
                                         getLines={getLines}
                                         error={isFieldNotEmpty(addressDetail.house)}
                                         defaultValue={addressDetail.house}/>
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>
                        <Title>Квартира</Title>
                        <AddressItemForm id={'flat'}
                                         getLines={getLines}
                                         error={isFieldNotEmpty(addressDetail.flat)}
                                         defaultValue={addressDetail.flat}/>
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>
                        <Title>Почтовый индекс</Title>
                        <AddressItemForm id={'postalCode'}
                                         getLines={getLines}
                                         error={isFieldNotEmpty(addressDetail.postalCode)}
                                         defaultValue={addressDetail.postalCode}/>
                    </Item>
                </Grid>
            </Grid>
            <Button disableRipple={true} onClick={onSubmit} variant={"contained"}>Сохранить</Button>
        </div>
    )


}

export default AddressEditMode;