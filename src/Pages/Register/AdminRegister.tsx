import React, { useState } from 'react';
import { Box, Grid, TextField, Button, Typography, Checkbox, FormControlLabel } from '@mui/material';
import InputText from '../../Components/inputComponent/InputText';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminRegister = () => {
    const ImageURL = 'https://fintech01.s3.ap-southeast-2.amazonaws.com/assets/';
    const BGURL = `${ImageURL}background-image3.jpg`;
    const [inputValue, setInputValue] = useState<{ [key: string]: string }>({});
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

    const navigate = useNavigate();
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setInputValue({ ...inputValue, [name]: value });
    };

    const validateInputs = () => {
        const { first_name, last_name, email, password } = inputValue;

        if (!first_name || first_name.trim() === '') {
            setError('First Name is required.');
            return false;
        }
        if (!last_name || last_name.trim() === '') {
            setError('Last Name is required.');
            return false;
        }
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Valid Email is required.');
            return false;
        }
        if (!password || password.length < 6) {
            setError('Password is required and should be at least 6 characters long.');
            return false;
        }
        setError('');
        return true;
    };

    const handleSubmit = async () => {
        if (!validateInputs()) return;

        const data = {
            ...inputValue,
        };
        // console.log('insert data', data);

        try {
            const response = await axios.post('http://localhost:3001/api/signup/admin', data);
            console.log('response', response);

            if (response.status === 201) {
                console.log('Login successful:', response.data);
                navigate('/');
            }

        } catch (error) {
            toast.error('Error during registration:');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen" style={{ backgroundImage: `url(${BGURL})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className='flex w-3/5 h-[70vh] bg-white rounded-xl  overflow-hidden'>
                <div className='w-1/2 relative bg-MatteBlack'>
                    {/* <img src={`${ImageURL}background-image5.jpg`} alt="Background" className='w-full h-full object-cover' /> */}
                    <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-white p-8 bg-black bg-opacity-40'>
                        <Typography variant='h3' className="text-3xl font-bold mb-4">
                            Techerudite</Typography>
                    </div>
                </div>
                <div className='w-1/2 flex flex-col justify-center p-8'>
                    <Typography variant="h4" className="font-bold mb-4 text-black text-5xl font-roboto">Admin Registration</Typography>
                    <Typography variant="body2" className="mb-8 ">
                        have an account? <a href="/login" className='text-blue-500'>Sign in</a>, it takes less than a minute.
                    </Typography>
                    <Box component="form" className='flex my-8 items-center justify-center'>
                        <Grid container spacing={2}>
                            <Grid item xs={6} className=''>
                                <InputText
                                    name='first_name'
                                    label="First Name"
                                    value={inputValue.first_name || ''}
                                    onChange={handleInputChange}
                                    type='text'
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <InputText
                                    name='last_name'
                                    label="Last Name"
                                    value={inputValue.last_name || ''}
                                    onChange={handleInputChange}
                                    type='text'
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <InputText
                                    name='email'
                                    label="Email"
                                    value={inputValue.email || ''}
                                    onChange={handleInputChange}
                                    type='email'
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <InputText
                                    name='password'
                                    label="Password"
                                    value={inputValue.password || ''}
                                    onChange={handleInputChange}
                                    type="password"
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <div className='flex items-center justify-center'>
                        <Button className='w-3/5 ' sx={{ backgroundColor: '#82c226', color: '#fff', fontWeight: '600' }} onClick={handleSubmit}>Register</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminRegister;