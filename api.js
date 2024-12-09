import { setCookie } from './general.js';
export async function get_menu() {
    let api_key;
    try {
        const response = await fetch('https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/menu', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-zocom': api_key,
            },
        });

        if (!response.ok) {
            throw new Error(`Error fetching menu: ${response.statusText}`);
        }

        const data = await response.json();
        if (data) {
            console.log('Menu data received:', data);
            setCookie('menu', JSON.stringify(data));
        } else {
            console.error('Error: No menu data received');
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}
