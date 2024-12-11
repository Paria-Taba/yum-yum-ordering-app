
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
        let menu2 = document.querySelector(".menu-2");
        
        let menu2Div = document.createElement("div");
        
        let menu2P = document.createElement("span");
        menu2P.textContent = "DIPSÅS";
        let menu2pric = document.createElement("span");
        menu2pric.textContent = "19 SEK";
        menu2Div.appendChild(menu2P);
        menu2Div.appendChild(menu2pric);
        menu2Div.classList.add("menu2-div");
        menu2.appendChild(menu2Div);
        
        let divAllSouce = document.createElement("div");
        divAllSouce.classList.add("all-souce");
        
        menu.items.forEach(item => {
            if (item.type === "dip") {
                let divsouce = document.createElement("div");
                divsouce.classList.add("div-souce");
                
                let souce = document.createElement("span");
                souce.textContent = item.name;
                divsouce.appendChild(souce);
                
                divAllSouce.appendChild(divsouce);
            }
        });
      
        menu2.appendChild(divAllSouce);
        
    } catch (error) {
        console.error('Error:', error.message);
        menuContainer.innerHTML = '<p>Error loading the menu. Please try again!</p>';
    }
}

createMenu2();

async function createMenu3() {
    let apiKey = key;
    try {
        const menu = await getMenu(); 
        let menu3 = document.querySelector(".menu-3");
        let menu3Div = document.createElement("div");
        
        let menu3P = document.createElement("span");
        menu3P.textContent = "DRICKA";
        let menu3pric = document.createElement("span");
        menu3pric.textContent = "19 SEK";
        menu3Div.appendChild(menu3P);
        menu3Div.appendChild(menu3pric);
        menu3Div.classList.add("menu2-div");
        menu3.appendChild(menu3Div);
        
        let divAllDrink = document.createElement("div");
        divAllDrink.classList.add("all-souce");
        
        menu.items.forEach(item => {
            if (item.type === "drink") {
                let divdrink = document.createElement("div");
                divdrink.classList.add("div-souce");
                
                let drink = document.createElement("span");
                drink.textContent = item.name;
                divdrink.appendChild(drink);
                
                divAllDrink.appendChild(divdrink);
            }
        });
      
        menu3.appendChild(divAllDrink);
        
    } catch (error) {
        console.error('Error:', error.message);
        menuContainer.innerHTML = '<p>Error loading the menu. Please try again!</p>';
    }
}

createMenu3();
