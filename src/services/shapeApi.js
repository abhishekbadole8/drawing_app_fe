import axios from 'axios';

export async function postShape(shapeData) {
    try {
        const response = await axios.post('/api/shapes', shapeData);

        if (!response.data) {
            throw new Error('Failed to post shape data');
        }

        return response.data;
    } catch (error) {
        console.error('Error posting shape data:', error);
        throw error;
    }
}
