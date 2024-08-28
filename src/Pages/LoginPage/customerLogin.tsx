import React, { useState } from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import InputText from '../../Components/inputComponent/InputText';
import { useAuth } from '../../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
const CustomerLogin = () => {
    const ImageURL = 'https://fintech01.s3.ap-southeast-2.amazonaws.com/assets/';
    const BGURL = `${ImageURL}background-image3.jpg`;

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = { email: '', password: '' };

        if (!formData.email) {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
            valid = false;
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await axios.post('http://localhost:3001/api/login/customer', formData);

                if (response.status === 200) {
                    toast('Login successful:');
                    login('dummyToken'); // Replace with actual token if available
                    navigate('/home');
                }
            } catch (error: any) {
                if (error.response) {
                    // Error response from server
                    toast.error(error.response.data.error || 'An error occurred');
                } else {
                    // Error without response (e.g., network error)
                    toast.error('Network error, please try again later');
                }
                console.error('Error during login:', error);
            }
        }
    };

    return (
        <main className="flex items-center justify-center min-h-screen" style={{ backgroundImage: `url(${BGURL})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="flex w-3/5 h-[70vh] bg-white rounded-xl overflow-hidden">
                <div className="w-1/2 relative bg-MatteBlack">
                    {/* Background and overlay for styling purposes */}
                    <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-white p-8 bg-black bg-opacity-40">
                       <Typography variant='h3' className="text-3xl font-bold mb-4">
                       Techerudite</Typography>
                    </div>
                </div>
                <div className="w-1/2 flex flex-col justify-center p-8">
                    <Typography variant="h4" className="font-bold mb-4 text-black text-5xl font-roboto">Login as Customer  <a href="/login"><SyncAltIcon /></a> </Typography>
                    <Typography variant="body2" className="mb-8">
                        Don’t have an account? <a href="/customer/register" className="text-blue-500">Create your account</a>, it takes less than a minute.
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} className="flex flex-col my-4 items-center justify-center">
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <InputText
                                    name="email"
                                    label="Email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    type="email"
                                    errors={!!errors.email}
                                    helperText={errors.email}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <InputText
                                    name="password"
                                    label="Password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    type="password"
                                    errors={!!errors.password}
                                    helperText={errors.password}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <div className='flex justify-center'>
                        <Button className='w-3/5 ' sx={{ backgroundColor: '#82c226', color: '#fff', fontWeight: '600' }} onClick={handleSubmit}>Login</Button>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default CustomerLogin;
