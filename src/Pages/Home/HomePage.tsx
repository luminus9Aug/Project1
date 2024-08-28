import { Typography } from '@mui/material';
import React from 'react';

const HomePage = () => {
    return (
        <div className='flex items-center justify-center bg-#caf1de w-full h-[100vh]'>
            <div>
                <Typography variant='h1'>Hello User</Typography>
                <Typography variant='h3'>Welcome!</Typography>
            </div>
        </div>
    );
}

export default HomePage;
