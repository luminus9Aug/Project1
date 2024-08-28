import { TextField } from '@mui/material';
import React, { FC, ChangeEvent } from 'react';
import colors from '../colors';

interface InputProps {
    name: string;
    label: string;
    value: string;
    helperText?: string;
    errors?: any;
    type?: string;
    placeholder?: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputText: FC<InputProps> = ({ label, value, onChange, name, type, placeholder, errors, helperText }) => {
    return (
        <div>
            <span className='text-MatteBlack font-roboto'>{label}</span>
            <div className=''>
                <TextField
                    sx={{
                        border: 0,
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: colors.darkBg, // Default border color
                                borderRadius: '16px', // Increase border radius
                            },
                            // '&:hover fieldset': {
                            //     borderColor: 'green', // Border color on hover
                            // },
                            '&.Mui-focused fieldset': {
                                borderColor: colors.logoColor, // Border color when focused
                            },
                        },
                    }}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className='rounded-lg border-gray-400'
                    variant="outlined"
                    type={type}
                    error={errors}
                    helperText={helperText}
                />
            </div>
        </div>
    );
};

export default InputText;
