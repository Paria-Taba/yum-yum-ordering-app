
const apiUrl = 'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com'
const key= "yum-vKkkQHqQboi7c6JF";
const menu = await getMenu();
export let productlist = [];
export let Cart = [];
let FirstEvent = 0;


async function getKey(){
	const options = {
		method: 'POST'
	}
	const response = await fetch(apiUrl + '/keys', options)
	const data = await response.json()
	console.log('API-nyckel data:', data)
}


async function getTenant (){

	const options = {
		method: 'POST',
		headers:{
			"Content-Type": 'application/json', 
			"x-zocom": key
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
	const options = {
		method: 'GET',
		headers: {
			"x-zocom": key
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
	
	try {
		
		let menuContainer = document.getElementById("menu-container");
		
		menu.items.forEach(item => {
			if (item.type === "wonton"){

				productlist.push([item.name, item.price]);
				let itemElement = document.createElement("div");
				itemElement.classList.add("div-row")
				
				let itemName = document.createElement("h3");
				itemName.setAttribute("class","title")
				itemName.textContent = item.name.toUpperCase();
				itemElement.appendChild(itemName);
				
				let itemLine=document.createElement("p");
				itemLine.classList.add("line");
				itemElement.appendChild(itemLine)
				
				let itemPrice = document.createElement('span');
				itemPrice.setAttribute("class","price")
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
	//console.log(productlist);
}
createMenu();

async function createMenu2() {

	try {
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
				productlist.push([item.name, item.price]);
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

	try {
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
				productlist.push([item.name, item.price]);
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
export  let cartContainer = document.querySelector(".cart-container");

export function increaseNumber() {
    let circle = document.querySelector(".circle");
    let menuContainer = document.getElementById("menu-container");
    let menu2 = document.querySelector(".menu-2");
    let menu3 = document.querySelector(".menu-3");
    let sumElement = document.querySelector(".sum"); 
    //let count = 0;
    let totalSum = 0; 

    function updateCircle() {
        let totalQuantity = Cart.reduce((sum, item) => sum + item.quantity, 0);
        circle.innerText = totalQuantity;
    }

    function addToCart(itemName, itemPrice, itemType) {
		let existingItem = Cart.find(cartItem => cartItem.name === itemName);
	
		let cartItem;
		let styck;
	
		if (existingItem) {
			existingItem.quantity += 1;
	
			styck = document.querySelector(`[data-name="${itemName}"] .styck`);
			if (styck) {
				styck.innerText = `${existingItem.quantity} stycken`;
			}
	
			let itemPriceElement = document.querySelector(`[data-name="${itemName}"] .price`);
			itemPriceElement.innerText = `${(existingItem.price * existingItem.quantity).toFixed(2)} SEK`;
		} else {
			Cart.push({
				name: itemName,
				price: parseFloat(itemPrice.replace("SEK", "").trim()),
				type: itemType,
				quantity: 1
			});
	
			cartItem = document.createElement("div");
			cartItem.classList.add("cart-item");
			cartItem.setAttribute("data-name", itemName); 

			let itemNameElement = document.createElement("span");
			itemNameElement.setAttribute("class", "title");
			itemNameElement.innerText = itemName;
	
			let itemPriceElement = document.createElement("span");
			itemPriceElement.classList.add("price");
			itemPriceElement.innerText = itemPrice;
	
			cartItem.appendChild(itemNameElement);
			cartItem.appendChild(itemPriceElement);
			cartContainer.appendChild(cartItem);
	
			let divCircle = document.createElement("div");
			divCircle.setAttribute("class", "div-circle");
	
			let plus = document.createElement("span");
			plus.classList.add("circle-design");
			plus.innerHTML = "+";
	
			let minus = document.createElement("span");
			minus.classList.add("circle-design");
			minus.innerHTML = "-";
	
			styck = document.createElement("span");
			styck.classList.add("styck");
			styck.innerHTML = "1 stycken";
	
			divCircle.appendChild(plus);
			divCircle.appendChild(styck);
			divCircle.appendChild(minus);
	
			cartItem.appendChild(divCircle);
	
			let price = parseFloat(itemPrice.replace("SEK", "").trim());
			plus.addEventListener("click", () => {
				existingItem = Cart.find(cartItem => cartItem.name === itemName);
				if (existingItem) {
					existingItem.quantity += 1;
					styck.innerHTML = `${existingItem.quantity} stycken`;
					itemPriceElement.innerText = `${(existingItem.price * existingItem.quantity).toFixed(2)} SEK`;
					updateTotalSum();
				}
			});
	
			minus.addEventListener("click", () => {
				existingItem = Cart.find(cartItem => cartItem.name === itemName);
				if (existingItem && existingItem.quantity > 1) {
					existingItem.quantity -= 1;
					styck.innerHTML = `${existingItem.quantity} stycken`;
					itemPriceElement.innerText = `${(existingItem.price * existingItem.quantity).toFixed(2)} SEK`;
					updateTotalSum();
				}
			});
		}
	
		updateCircle();
		
	}
	

    function updateSum() {
		let totalSum = Cart.reduce((sum, cartItem) => {
			return sum + cartItem.price * cartItem.quantity;
		}, 0); 
        sumElement.innerText = `${totalSum} SEK`; 
    }

    

    function updateTotalSum() {
        totalSum = 0;
        let cartItems = cartContainer.querySelectorAll(".cart-item");
        cartItems.forEach(item => {
            let itemPrice = item.querySelector("span:nth-child(2)").innerText;
            totalSum += parseFloat(itemPrice.replace("SEK", "").trim());
        });
        sumElement.innerText = `${totalSum.toFixed(2)} SEK`;
    }

	if(FirstEvent == 0){
		FirstEvent = 1;
		menuContainer.addEventListener("click", (event) => {
			if (event.target.classList.contains("div-row") || event.target.classList.contains("title") || event.target.classList.contains("line") || event.target.classList.contains("price")) {
				let itemName = event.target.closest(".div-row").querySelector(".title").innerText;
				let itemPrice = event.target.closest(".div-row").querySelector(".price").innerText;
	
				
				let itemType = "wonton";

				addToCart(itemName, itemPrice, itemType);
				updateSum();
			}
		});

		menu2.addEventListener("click", (event) => {
			if (event.target.closest(".div-souce")) {

				let itemName = event.target.innerText;
				let itemPrice = "19 SEK";
				let itemType = "dip";

				addToCart(itemName, itemPrice, itemType);
				updateSum();
			}
		});

		menu3.addEventListener("click", (event) => {
			if (event.target.closest(".div-souce")) {
				let itemName = event.target.innerText;
				let itemPrice = "19 SEK";
				let itemType = "drink";

				addToCart(itemName, itemPrice, itemType);
				updateSum();
			}
		});
	}

}

increaseNumber();
