import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditNoteIcon from '@mui/icons-material/EditNote';
import './priceOffers.css'
export default function PriceOffersList({ priceOffers, setPriceOffers }) {

    const [currentEdit, setCurrentEdit] = useState({ key: null, amount: '', description: '' })
    const deletePrice = (index) => {
        setPriceOffers(priceOffers.filter((price, i) => i != index))
    }

    const handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setCurrentEdit({ ...currentEdit, [name]: value })
    }

    const saveEdit = (index) => {
        setPriceOffers(priceOffers.map((price, i) => {
            if (i != index) return price
            return currentEdit
        }));
        setCurrentEdit({ ...currentEdit, key: null })
    }
    return (
        <List className='list'>
            {priceOffers.map((value, i) => (
                <ListItem className='list-item'
                    key={`element${i}`}
                    disableGutters
                    secondaryAction={<>
                        <IconButton aria-label="delete" onClick={() => deletePrice(i)}>
                            <DeleteIcon />
                        </IconButton>
                        <IconButton aria-label="edit" onClick={() => {
                            currentEdit.key == i ? saveEdit(i) : setCurrentEdit({ ...value, key: i })
                        }}>
                            <EditNoteIcon />
                        </IconButton></>
                    }
                >
                    <input name='amount' disabled={currentEdit.key != i} value={currentEdit.key != i ? value.amount : currentEdit.amount}
                        onChange={handleChange} />
                    <input name='description' disabled={currentEdit.key != i} value={currentEdit.key != i ? value.description : currentEdit.description}
                        onChange={handleChange} />
                </ListItem>
            ))}
        </List>
    );
}
