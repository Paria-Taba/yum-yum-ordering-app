let boxBasket=document.querySelector(".box-basket");
let container=document.querySelector(".container")
let container2=document.querySelector(".container-2");
let container3=document.querySelector(".container-3");
let buttonOrder=document.querySelector(".button-order");
let container4=document.querySelector(".container-4");
let buttonBack=document.querySelector(".button-back");

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

    const cartContainer = document.querySelector(".cart-container");
    const circle = document.querySelector(".circle");
    const sumElement = document.querySelector(".sum");

    cartContainer.innerHTML = '';
    circle.innerText = '0';  

    sumElement.innerHTML = '0 SEK';

    container.style.display = "block";
    container2.style.display = "none";
    container3.style.display = "none";
	
	

}

buttonOrder.addEventListener("click", () => {
	resetAll();
	

});



let buttonRecept1=document.querySelector(".button-recept1");
buttonRecept1.addEventListener("click",()=>{
	container.style.display = "none";
    container2.style.display = "none";
    container3.style.display = "none";
	container4.style.display="block";
	
	
})
buttonBack.addEventListener("click",()=>{
resetAll();

	
})