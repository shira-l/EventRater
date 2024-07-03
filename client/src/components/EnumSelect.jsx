import  React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function EnumSelect(props){


    const{currentEnum,enumValues,handleChange}=props;
return(<>
 <FormControl required sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-required-label">{currentEnum}</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={age}
          label={`${currentEnum} *`}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>{currentEnum}</em>
          </MenuItem>
          {enumValues.map(element=><MenuItem key={element.id}value={element.id}>{element.name}</MenuItem>)}
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>

</>)
}