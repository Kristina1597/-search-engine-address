import React, {useState} from "react";
import {Button, Grid} from "@mui/material";
import styled from "styled-components";
import AddressItemForm from "./AddressItemForm";
import {setEditedAddressActionCreator} from "../redux/addressReducer";


const AddressEditMode = (props) => {



    const getLines = (e) => {
        let id = e.currentTarget.id;
        switch (id) {
            case 'region':
                props.addressDetail.region = e.target.value;
                break
            case 'city':
                props.addressDetail.city = e.target.value;
                break
            case 'street':
                props.addressDetail.street = e.target.value;
                break
            case 'house':
                props.addressDetail.house = e.target.value;
                break
            case 'flat':
                props.addressDetail.flat = e.target.value;
                break
            case 'postalCode':
                props.addressDetail.postalCode = e.target.value;
                break
        }

    }


    let Item = styled.div`
      margin: 10px 0;
    `;

    let Title = styled.h3`
      margin-bottom: 10px;
    `;
    return (<div>
            <Grid marginBottom={'30px'} container spacing={2} justifyContent={"space-between"}>
                <Title>{props.message1}</Title>
                <Grid item xs={6}>
                    <Item>
                        <Title>Регион</Title>
                        <AddressItemForm id={'region'}
                                         getLines={getLines}
                                         error={props.addressDetail.region === ''}
                                         defaultValue={props.addressDetail.region}
                        />
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>
                        <Title>Населенный пункт</Title>
                        <AddressItemForm id={'city'}
                                         getLines={getLines}
                                         error={props.addressDetail.city === ''}
                                         defaultValue={props.addressDetail.city}
                        />
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>
                        <Title>Улица</Title>
                        <AddressItemForm id={'street'}
                                         getLines={getLines}
                                         error={props.addressDetail.street === ''}
                                         defaultValue={props.addressDetail.street}
                        />
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>
                        <Title>Дом</Title>
                        <AddressItemForm id={'house'}
                                         getLines={getLines}
                                         error={props.addressDetail.house === ''}
                                         defaultValue={props.addressDetail.house}/>
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>
                        <Title>Квартира</Title>
                        <AddressItemForm id={'flat'}
                                         getLines={getLines}
                                         error={props.addressDetail.flat === ''}
                                         defaultValue={props.addressDetail.flat}/>
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>
                        <Title>Почтовый индекс</Title>
                        <AddressItemForm id={'postalCode'}
                                         getLines={getLines}
                                         error={props.addressDetail.postalCode === ''}
                                         defaultValue={props.addressDetail.postalCode}/>
                    </Item>
                </Grid>
            </Grid>
        </div>
    )


}

export default AddressEditMode;