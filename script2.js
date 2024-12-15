import { increaseNumber } from "./script.js";
import { Cart } from "./script.js";
import { productlist } from "./script.js";
import { cartContainer } from "./script.js";



let boxBasket=document.querySelector(".box-basket");
let container=document.querySelector(".container")
let container2=document.querySelector(".container-2");
let container3=document.querySelector(".container-3");
let buttonOrder=document.querySelector(".button-order");
let container4=document.querySelector(".container-4");
let buttonBack=document.querySelector(".button-back");
let recept=document.querySelector(".recept");

let svg2=document.querySelector(".svg-2")


boxBasket.addEventListener("click",()=>{
	container.style.display="none"
	container2.style.display="block"
})

svg2.addEventListener("click",()=>{
	container2.style.display="none"
	container.style.display="block"
})

let money=document.querySelector(".money");
money.addEventListener("click",()=>{
	container.style.display="none"
	container2.style.display="none"
	container3.style.display="block"
})


function resetAll() {

	const circle = document.querySelector(".circle");
	const sumElement = document.querySelector(".sum");

cartContainer.innerHTML="";
	Cart.length = 0;
	productlist.length = 0;
		
	circle.innerText = '0';  

	sumElement.innerHTML = '0 SEK';
	
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

	let divItem=document.createElement("div");

	cartItems.forEach(item => {
		let itemClone = item.cloneNode(true);
		divItem.appendChild(itemClone); 
		
	});
		
	
	divItem.setAttribute("class","div-item");
	recept.appendChild(divItem)
	
	let sumClone = sumElement.cloneNode(true); 
	sumClone.setAttribute("class","sum-clone")
	
	let totaldiv=document.createElement("div");
	totaldiv.setAttribute("class","total-div");
	let titleTotal=document.createElement("span");
	titleTotal.innerHTML=`TOTALT (inkl 20% moms)`;
	titleTotal.setAttribute("class","title-total")
	totaldiv.append(titleTotal)
	totaldiv.appendChild(sumClone); 
	recept.appendChild(totaldiv);
	
	
	
});

buttonBack.addEventListener("click",()=>{
	

	container.style.display = "block";
	container2.style.display = "none";
	container3.style.display = "none";
	container4.style.display = "none"; 
	resetAll();
})