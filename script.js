
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
	console.log(data);
	return data; 
}


async function createMenu() {
	let apiKey = key;
	try {
		const menu = await getMenu(); 
		
		let menuContainer = document.getElementById("menu-container");
		
		menu.items.forEach(item => {
			if (item.type === "wonton"){
				let itemElement = document.createElement("div");
				itemElement.classList.add("div-row")
				
				let itemName = document.createElement("h3");
				itemName.textContent = item.name.toUpperCase();
				itemElement.appendChild(itemName);
				
				let itemLine=document.createElement("p");
				itemLine.classList.add("line");
				itemElement.appendChild(itemLine)
				
				let itemPrice = document.createElement('span');
				itemPrice.textContent = `${item.price} SEK`;
				itemElement.appendChild(itemPrice);
				
				menuContainer.appendChild(itemElement);
				
				let divText=document.createElement("div");
				let text=document.createElement("p");
				text.innerText=item.ingredients;
				divText.appendChild(text);
				menuContainer.appendChild(divText);
				
			}
		});
	} catch (error) {
		console.error('Error:', error.message);
		const menuContainer = document.getElementById('menu-container');
		menuContainer.innerHTML = '<p>Error loading the menu. Please try again!</p>';
	}
}
createMenu();


async function createMenu2() {
	let apiKey = key;
	try {
		const menu = await getMenu(); 
		let menu2=document.querySelector(".menu-2")
		
		let menu2Div=document.createElement("div");
		
		let menu2P=document.createElement("span")
		menu2P.textContent="DIPSÅS"
		let menu2pric=document.createElement("span");
		menu2pric.textContent="19 SEK"
		menu2Div.appendChild(menu2P)
		menu2Div.appendChild(menu2pric)
		menu2Div.classList.add("menu2-div")
		menu2.appendChild(menu2Div);
		
		menu.items.forEach(item => {
			if(item.type==="dip"){
				let divsouce=document.createElement("div");
			menu2.appendChild(divsouce);
				let souce=document.createElement("span");
				souce.textContent=item.name;
				divsouce.appendChild(souce)
				divsouce.classList.add("div-souce")

				
				
			}
		});
			
			
	} catch (error) {
		console.error('Error:', error.message);
		menuContainer.innerHTML = '<p>Error loading the menu. Please try again!</p>';
	}
}
createMenu2();
