import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function EnumSelect(props) {
  const { currentEnum, enumValues, register,errors } = props;

  return (<>
    <FormControl  sx={{ m: 1, minWidth: 120 }}>

      <InputLabel id="demo-simple-select-required-label">{currentEnum}</InputLabel>
      <Select
        labelId="demo-simple-select-required-label"
        id="demo-simple-select-required"
        label={`${currentEnum} *`}
        {...register(currentEnum, { required: "required" })}
      >
        <MenuItem value="">
          <em>{currentEnum}</em>
        </MenuItem>
        {enumValues.map((el, i) => (<MenuItem key={i} value={Object.values(el)[0]}>{Object.values(el)[1]}</MenuItem>))}
      </Select>
      <FormHelperText>{errors[currentEnum]?errors[currentEnum].message:''}</FormHelperText>
    </FormControl>
  </>)
}