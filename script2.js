let boxBasket=document.querySelector(".box-basket");
let container=document.querySelector(".container")
let container2=document.querySelector(".container-2");
let container3=document.querySelector(".container-3");
let buttonOrder=document.querySelector(".button-order");

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

buttonOrder.addEventListener("click", () => {
    container.style.display = "block";
    container2.style.display = "none";
    container3.style.display = "none";

    const cartContainer = document.querySelector(".cart-container");
    cartContainer.innerHTML = ""; 
    const circle = document.querySelector(".circle");
    circle.innerText = "0"; 
    const sumElement = document.querySelector(".sum");
    sumElement.innerText = "0 SEK"; 
});
