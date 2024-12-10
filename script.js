
const apiUrl = 'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com'

async function getKey(){
	const options = {
		method: 'POST'
	}
	const response = await fetch(apiUrl + '/keys', options)
	const data = await response.json()
	console.log('API-nyckel data:', data)
}

const key= "yum-vKkkQHqQboi7c6JF";

 async function getTenant (){
	
	let apiKey = key;
	const options = {
		method: 'POST',
		headers:{
        "Content-Type": 'application/json', 
        "x-zocom": apiKey
		},
		body: JSON.stringify({ name: 'Paria Taba2' })
	}
	const response = await fetch(apiUrl + '/tenants', options)
	const data = await response.json()
	console.log('Tenant: ', data)
}


const tenantId= 'pjem'
const tenantName='Paria Taba2'

async function getMenu() {
    let apiKey = key;
    const options = {
        method: 'GET',
        headers: {
            "x-zocom": apiKey
        }
    };
    const response = await fetch(apiUrl + '/menu', options);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data; 
}


async function createMenu() {
    let apiKey = key;
    try {
        const menu = await getMenu(); 

        let menuContainer = document.getElementById("menu-container");
        menuContainer.innerHTML = '';

        menu.items.forEach(item => {
            let itemElement = document.createElement("div");
            itemElement.classList.add("menu-item-1");

            let itemName = document.createElement("h3");
            itemName.textContent = item.name;
            itemElement.appendChild(itemName);

            let itemPrice = document.createElement('p');
            itemPrice.textContent = `${item.price} SEK`;
            itemElement.appendChild(itemPrice);

            menuContainer.appendChild(itemElement);
        });
    } catch (error) {
        console.error('Error:', error.message);
        const menuContainer = document.getElementById('menu-container');
        menuContainer.innerHTML = '<p>Error loading the menu. Please try again!</p>';
    }
}
createMenu();
