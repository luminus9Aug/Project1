import axios from 'axios';

export const registerCustomer = async (data) => {
    try {
        const response = await axios.post('https://your-api-endpoint.com/register', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error registering customer:', error);
        throw error;
    }
};
