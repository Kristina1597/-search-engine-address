import React from "react";
import {Button, Grid} from "@mui/material";
import styled from "styled-components";
import AddressItemForm from "./AddressItemForm";


const AddressEditMode = (props) => {


    let addressDetail = {
            region : props.fullCurrentAddress.region || "",
            city : props.fullCurrentAddress.city || "",
            street : props.fullCurrentAddress.street || "",
            house : props.fullCurrentAddress.house || "",
            flat : props.fullCurrentAddress.flat || "",
            postalCode : props.fullCurrentAddress.postalCode || "",
    }

    const getLines = (e) => {
        let id = e.currentTarget.id;
        switch (id) {
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
        }
        console.log(addressDetail)
    }

    const onSubmit = (e) => {

    }

    let Item = styled.div`
      margin: 10px 0;
    `;

    let Title = styled.h3`
      margin-bottom: 10px;
    `;
    return (<div>
            <Grid marginBottom={'30px'} container spacing={2} justifyContent={"space-between"}>
                <Grid item xs={6}>
                    <Item>
                        <Title>Регион</Title>
                        <AddressItemForm id={'region'}
                                         getLines={getLines}
                                         defaultValue={addressDetail.region}/>
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>
                        <Title>Населенный пункт</Title>
                        <AddressItemForm id={'city'}
                                         getLines={getLines}
                                         defaultValue={addressDetail.city}/>
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>
                        <Title>Улица</Title>
                        <AddressItemForm id={'street'}
                                         getLines={getLines}
                                         defaultValue={addressDetail.street}/>
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>
                        <Title>Дом</Title>
                        <AddressItemForm id={'house'}
                                         getLines={getLines}
                                         defaultValue={addressDetail.house}/>
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>
                        <Title>Квартира</Title>
                        <AddressItemForm id={'flat'}
                                         getLines={getLines}
                                         defaultValue={addressDetail.flat}/>
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>
                        <Title>Почтовый индекс</Title>
                        <AddressItemForm id={'postalCode'}
                                         getLines={getLines}
                                         defaultValue={addressDetail.postalCode}/>
                    </Item>
                </Grid>
            </Grid>
            <Button onClick={onSubmit} variant={"contained"}>Сохранить</Button>
        </div>
    )


}

export default AddressEditMode;