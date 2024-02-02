import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import React, { useEffect } from 'react';

interface SwitchProps {
    options: any,
    name: string,
    onChange?: any,
    onBlur?: any,
    size?: "small" | "medium" | 'large',
    value?: any,
    errors?: any,
    helperText?: any,
    getOptionLabel?: any,
    placeholder?: any,
    disabled:boolean
}

export const CMAutoComplete = (props: SwitchProps) => {
    console.log(props)
    const changeField = (e: any, newValue: any) => {
        console.log(newValue)
        props.onChange(newValue);
        setValue(newValue);
    }
    const [value, setValue] = React.useState<any>('')
    useEffect(() => {
        setTimeout(() => {
            if (props.value && value === '')
                setValue(props.value)
            console.log(props.value)
        }, 100)
    }, [props])
    return (
        <Autocomplete
            disableClearable={true}
            fullWidth={true}
            clearOnEscape={true}
            disabled={props.disabled}
            size='small'
            options={props.options}
            isOptionEqualToValue={(option, value) => value && option.id === value.id}
            value={value}
            onChange={changeField}
            renderInput={(params: any) => <TextField {...params} name={props.name} error={props.errors} helperText={props.helperText} />}
        />
    )
}

