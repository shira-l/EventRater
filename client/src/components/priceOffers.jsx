import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { APIrequests } from '../APIrequests';
import './priceOffers.css'
export default function PriceOffersList({ priceOffers, setPriceOffers, isNewBusiness }) {

    const APIrequest = new APIrequests()
    const [currentEdit, setCurrentEdit] = useState({ key: null, itemPrice: '', itemDescription: '' })

    const handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setCurrentEdit({ ...currentEdit, [name]: value })
    }

    const saveEdit =async (index) => {
        try {
            if (!isNewBusiness) {
                const requestBody = {
                    idPrice: price.idPrice,
                    itemPrice: currentEdit.itemPrice,
                    itemDescription: currentEdit.itemDescription
                }
                await APIrequest.putRequest(`/prices`, requestBody)
            }
            setPriceOffers(priceOffers.map((price, i) => {
                if (i != index) return price
                return currentEdit
            }));
            setCurrentEdit({ ...currentEdit, key: null })
        }
        catch (error) {
            alert('Error editting price offer:', error.message);
        }
    }

    const deletePrice = async (price, index) => {
        try {
            if (!isNewBusiness)
                await APIrequest.deleteRequest(`/prices/${price.idPrice}`)
            setPriceOffers(priceOffers.filter((price, i) => i != index))
            localStorage.setItem("prices", priceOffers)
        }
        catch (error) {
            alert('Error deleting price offer:', error.message);
        }
    }


    return (
        <List className='list'>
            {priceOffers.map((value, i) => (
                <ListItem className='list-item'
                    key={`element${i}`}
                    disableGutters
                    secondaryAction={<>
                        <IconButton aria-label="delete" onClick={() => deletePrice(value, i)}>
                            <DeleteIcon />
                        </IconButton>
                        <IconButton aria-label="edit" onClick={() => {
                            currentEdit.key == i ? saveEdit(i) : setCurrentEdit({ ...value, key: i })
                        }}>
                            <EditNoteIcon />
                        </IconButton></>
                    }
                >
                    <input name='itemPrice' disabled={currentEdit.key != i} value={currentEdit.key != i ? value.itemPrice : currentEdit.itemPrice}
                        onChange={handleChange} />
                    <input name='itemDescription' disabled={currentEdit.key != i} value={currentEdit.key != i ? value.itemDescription : currentEdit.itemDescription}
                        onChange={handleChange} />
                </ListItem>
            ))}
        </List>
    );
}
