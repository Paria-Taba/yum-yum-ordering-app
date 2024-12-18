import { getMenu, createOrder } from "./api.js";

document.addEventListener("DOMContentLoaded", async function (event) {
  let productlist = [];
  let Cart = [];
  let FirstEvent = 0;

  const menu = await getMenu();
  productlist = menu.items;
  let menuContainer = document.getElementById("menu-container");
  async function createMenu() {
    try {
      menu.items.forEach((item) => {
        if (item.type === "wonton") {
          let itemElement = document.createElement("div");
          itemElement.classList.add("div-row");
          itemElement.setAttribute(`product-id`, item.id);
          let itemName = document.createElement("h3");
          itemName.setAttribute("class", "title");
          itemName.textContent = item.name.toUpperCase();
          itemElement.appendChild(itemName);

          let itemLine = document.createElement("p");
          itemLine.classList.add("line");
          itemElement.appendChild(itemLine);

          let itemPrice = document.createElement("span");
          itemPrice.setAttribute("class", "price");
          itemPrice.textContent = `${item.price} SEK`;
          itemElement.appendChild(itemPrice);

          menuContainer.appendChild(itemElement);

          let divText = document.createElement("div");
          let text = document.createElement("p");
          text.innerText = item.ingredients;
          divText.appendChild(text);
          menuContainer.appendChild(divText);
        }
      });
    } catch (error) {
      console.error("Error:", error.message);
      const menuContainer = document.getElementById("menu-container");
      menuContainer.innerHTML =
        "<p>Error loading the menu. Please try again!</p>";
    }
  }
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

      menu.items.forEach((item) => {
        if (item.type === "dip") {
          let divsouce = document.createElement("div");
          divsouce.classList.add("div-souce");
          divsouce.setAttribute(`product-id`, item.id);
          let souce = document.createElement("span");
          souce.textContent = item.name;
          divsouce.appendChild(souce);

          divAllSouce.appendChild(divsouce);
        }
      });

      menu2.appendChild(divAllSouce);
    } catch (error) {
      console.error("Error:", error.message);
      menuContainer.innerHTML =
        "<p>Error loading the menu. Please try again!</p>";
    }
  }
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

      menu.items.forEach((item) => {
        if (item.type === "drink") {
          let divdrink = document.createElement("div");
          divdrink.classList.add("div-souce");
          divdrink.setAttribute(`product-id`, item.id);
          let drink = document.createElement("span");
          drink.textContent = item.name;
          divdrink.appendChild(drink);

          divAllDrink.appendChild(divdrink);
        }
      });

      menu3.appendChild(divAllDrink);
    } catch (error) {
      console.error("Error:", error.message);
      menuContainer.innerHTML =
        "<p>Error loading the menu. Please try again!</p>";
    }
  }

  await createMenu();
  await createMenu2();
  await createMenu3();
  let cartContainer = document.querySelector(".cart-container");

  function increaseNumber() {
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

    function addToCart(product) {
      let existingItem = Cart.find((cartItem) => cartItem.id === product.id);

      let cartItem;
      let styck;

      if (existingItem) {
        existingItem.quantity += 1;

        styck = document.querySelector(`[data-name="${product.name}"] .styck`);
        if (styck) {
          styck.innerText = `${existingItem.quantity} stycken`;
        }

        let itemPriceElement = document.querySelector(
          `[data-name="${product.name}"] .price`
        );
        itemPriceElement.innerText = `${(
          existingItem.price * existingItem.quantity
        ).toFixed(2)} SEK`;
      } else {
        Cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          type: product.type,
          quantity: 1,
        });

        cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.setAttribute("data-name", product.name);

        let itemNameElement = document.createElement("span");
        itemNameElement.setAttribute("class", "title");
        itemNameElement.innerText = product.name;

        let itemPriceElement = document.createElement("span");
        itemPriceElement.classList.add("price");
        itemPriceElement.innerText = `${product.price} SEK`;

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

        plus.addEventListener("click", () => {
          existingItem = Cart.find((cartItem) => cartItem.id === product.id);
          if (existingItem) {
            existingItem.quantity += 1;
            styck.innerHTML = `${existingItem.quantity} stycken`;
            itemPriceElement.innerText = `${(
              existingItem.price * existingItem.quantity
            ).toFixed(2)} SEK`;
            updateTotalSum();
          }
        });

        minus.addEventListener("click", () => {
          existingItem = Cart.find((cartItem) => cartItem.id === product.id);
          if (existingItem && existingItem.quantity > 0) {
            existingItem.quantity -= 1;
            styck.innerHTML = `${existingItem.quantity} stycken`;
            itemPriceElement.innerText = `${(
              existingItem.price * existingItem.quantity
            ).toFixed(2)} SEK`;
            updateTotalSum();
          }
		  if(existingItem.quantity===0){
			cartItem.remove();
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
      cartItems.forEach((item) => {
        let itemPrice = item.querySelector("span:nth-child(2)").innerText;
        totalSum += parseFloat(itemPrice.replace("SEK", "").trim());
      });
      sumElement.innerText = `${totalSum.toFixed(2)} SEK`;
    }

    if (FirstEvent == 0) {
      FirstEvent = 1;
      menuContainer.addEventListener("click", (event) => {
        if (
          event.target.classList.contains("div-row") ||
          event.target.classList.contains("title") ||
          event.target.classList.contains("line") ||
          event.target.classList.contains("price")
        ) {
          
          let productId = parseInt(event.target.getAttribute("product-id"));
          let product = productlist.find((a) => a.id === productId);
          addToCart(product);
          updateSum();
        }
      });

      menu2.addEventListener("click", (event) => {
        
        if (event.target.closest(".div-souce")) {
          let productId = parseInt(
            event.target.parentNode.getAttribute("product-id")
          );
          let product = productlist.find((a) => a.id === productId);
          addToCart(product);
          updateSum();
        }
      });

      menu3.addEventListener("click", (event) => {
        
        if (event.target.closest(".div-souce")) {
          let productId = parseInt(
            event.target.parentNode.getAttribute("product-id")
          );
          let product = productlist.find((a) => a.id === productId);
          addToCart(product);
		 
          updateSum();
        }
      });
    }
  }
  increaseNumber();

  let boxBasket = document.querySelector(".box-basket");
  let container = document.querySelector(".container");
  let container2 = document.querySelector(".container-2");
  let container3 = document.querySelector(".container-3");
  let buttonOrder = document.querySelector(".button-order");
  let container4 = document.querySelector(".container-4");
  let buttonBack = document.querySelector(".button-back");
  let recept = document.querySelector(".recept");
  let svg2 = document.querySelector(".svg-2");
  let receptId=document.querySelector(".recept-id");
  let receptId1=document.querySelector(".recept-id1");
  let min=document.querySelector(".min")

  boxBasket.addEventListener("click", () => {
    container.style.display = "none";
    container2.style.display = "block";
  });

  svg2.addEventListener("click", () => {
    container2.style.display = "none";
    container.style.display = "block";
  });

  let money = document.querySelector(".money");
  money.addEventListener("click", async () => {
	let cartProductList = Cart.map((a) => a.id);
  
	try {
	  const addOrder = await createOrder(cartProductList);
	  console.log("API response:", addOrder);
  

		const orderId = addOrder.order.id;
		console.log("Order ID:", orderId); 
		
		  receptId.innerHTML = `Order ID: ${orderId}`; 
		  receptId1.innerHTML = `Order ID: ${orderId}`; 
		  const orderEta=addOrder.order.eta;
		  const etaDate = new Date(orderEta); 
		  const currentDate = new Date(); 
	
		  const etaMinutes = Math.floor((etaDate - currentDate) / (1000 * 60));
		  min.innerHTML=`ETA ${etaMinutes} MIN`;
  
	 
	  Cart = [];
	  container.style.display = "none";
	  container2.style.display = "none";
	  container3.style.display = "block";
	} catch (error) {
	  console.error("Error creating order:", error.message);
	  if (receptId) {
		receptId.innerHTML = "Error: Could not create order.";
	  }
	}
  });
  


  function resetAll() {
    const circle = document.querySelector(".circle");
    const sumElement = document.querySelector(".sum");

    cartContainer.innerHTML = "";
    Cart.length = 0;
    Cart = [];

    circle.innerText = "0";

    sumElement.innerHTML = "0 SEK";

    container.style.display = "block";
    container2.style.display = "none";
    container3.style.display = "none";

    increaseNumber();
  }

  buttonOrder.addEventListener("click", () => {
    resetAll();
  });
  let buttonRecept1 = document.querySelector(".button-recept1");

  buttonRecept1.addEventListener("click", () => {
    
    container.style.display = "none";
    container2.style.display = "none";
    container3.style.display = "none";
    container4.style.display = "block";

    let cartItems = document.querySelectorAll(".cart-item");
    let sumElement = document.querySelector(".sum");

    let divItem = document.createElement("div");

    cartItems.forEach((item) => {
      let itemNameElement = item.querySelector(".title");
      let itemPriceElement = item.querySelector(".price");
      let styck = item.querySelector(".styck");

      let itemContainer = document.createElement("div");
      itemContainer.setAttribute("class", "item-container");

      let itemNameClone = itemNameElement.cloneNode(true);
      let itemPriceClone = itemPriceElement.cloneNode(true);
      let styckClone = styck.cloneNode(true);

      itemContainer.appendChild(itemNameClone);
      itemContainer.appendChild(itemPriceClone);
      itemContainer.appendChild(styck);

      divItem.appendChild(itemContainer);
    });

    divItem.setAttribute("class", "div-item");
    recept.appendChild(divItem);

    let sumClone = sumElement.cloneNode(true);
    sumClone.setAttribute("class", "sum-clone");

    let totaldiv = document.createElement("div");
    totaldiv.setAttribute("class", "total-div");
    let titleTotal = document.createElement("span");
    titleTotal.innerHTML = `TOTALT (inkl 20% moms)`;
    titleTotal.setAttribute("class", "title-total");
    totaldiv.append(titleTotal);
    totaldiv.appendChild(sumClone);
    recept.appendChild(totaldiv);
  });

  buttonBack.addEventListener("click", () => {
    container.style.display = "block";
    container2.style.display = "none";
    container3.style.display = "none";
    container4.style.display = "none";
    resetAll();
  });
});
