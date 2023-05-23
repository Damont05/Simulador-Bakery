//********************************************************
/*
*   SIMULADOR             : BAKERY 'ENTREAMASADOS'
*   COMISION JAVASCRIPT   : 51360
*   AUTHOR                : Luis Daniel Montero Falcon
*/
//********************************************************

//**********PRODUCTOS************
//Arrays de productos 
const listProducts = [
    {
        id      : "1", 
        name    : "Pan Frances baguette", 
        price   : 200,
        weight  : "180 - 200g",
        cant    : 1,
        img     : "https://cuk-it.com/wp-content/uploads/2020/07/thumb03-low-1024x576.jpg"
    },
    {
        id      : "2", 
        name    : "Pan Dulce",    
        price   : 500,
        weight  : "6 unidades",
        cant    : 1,
        img     : "https://enharinado.com/wp-content/uploads/2017/03/tunjitas.jpg"

    },
    {
        id      : "3", 
        name    : "Pan de Molde", 
        price   : 600,
        weight  : "paq - 700g",
        cant    : 1,
        img     : "https://media.mykaramelli.com/galeria/recetas/receta-de-pan-de-molde_352_1.jpg"
    },
    {
        id      : "4", 
        name    : "Pan de Molde Integral", 
        price   : 400,
        weight  : "paq - 450g",
        cant    : 1,
        img     : "https://harinas.monisa.com/wp-content/uploads/2018/08/IntegralWeb.png"
    },
    {
        id      : "5", 
        name    : "Brownies",     
        price   : 450,
        weight  : "unidad, 100 - 120g",
        cant    : 1,
        img     : "https://www.pequerecetas.com/wp-content/uploads/2018/09/brownie-de-chocolate-receta.jpg"
    },
    {
        id      : "6", 
        name    : "Medialunas",   
        price   : 430,
        weight  : "5 unidades",
        cant    : 1,
        img     : "https://cuk-it.com/wp-content/uploads/2021/06/thumb02-e1624221067478.jpg"
    },
    {
        id      : "7", 
        name    : "Empanada",     
        price   : 290,
        weight  : "unidad - 100g",
        cant    : 1,
        img     : "https://cdn.kiwilimon.com/brightcove/7151/7151.jpg"
    },
    {
        id      : "8", 
        name    : "Alfajor",      
        price   : 300,
        weight  : "6 unidades",
        cant    : 1,
        img     : "https://www.elmundoeats.com/wp-content/uploads/2021/07/FP2-Argentine-alfajores-on-a-rack-500x500.jpg"
    },
    {
        id      : "9", 
        name    : "Magdalenas",   
        price   : 600,
        weight  : "7 unidades",
        cant    : 1,
        img     : "https://www.pequerecetas.com/wp-content/uploads/2012/11/magdalenas.jpg"
    },
    {
        id      : "10",
        name    : "Berlines",     
        price   : 300,
        weight  : "unidad - 80g",
        cant    : 1,
        img     : "https://lh3.googleusercontent.com/-D2KE4kAMVkE/YLAB1nwETfI/AAAAAAAAPR0/unz8_hcBeeYCJ5IiPZrWYGZUrE5sx2S1wCLcBGAsYHQ/bolasdefraile123456789.jpg"
    },
    {
        id      : "11",
        name    : "Focaccia",     
        price   : 250,
        weight  : "3 unidades",
        cant    : 1,
        img     : "https://www.paulinacocina.net/wp-content/uploads/2020/06/focaccia-2241107-960-720-e1592176339445.jpg"
    },
    {
        id      : "12",
        name    : "Ciabatta",     
        price   : 260,
        weight  : "180 - 200g",
        cant    : 1,
        img     : "https://www.comedera.com/wp-content/uploads/2022/02/pan-de-ciabatta.jpg"
    }
]; 
//**********FIN PRODUCTOS************

//Se almacena(getlocalstorage) el localstorage para trabajar siempre con los mismos datos 
let listOrder = JSON.parse(localStorage.getItem("listOrder")) || [];
//recupero el nodo del html donde le creare un nodo hijo con el contenido(productos) 
const content = document.getElementById("content");
//obtener los productos de la canasta
const getCart = document.getElementById("getCart");
//obtener del html el div nodo padre
const cartContainer = document.getElementById("cart-container");
const cantCart  =document.getElementById("cantCart");
//IVA
const IVA = 0.21;

//recorriendo array para mostrar contenido, creando nodo hijo
listProducts.forEach((products) => {
    let divProducts = document.createElement("div");
    divProducts.className = "card";  

    divProducts.innerHTML =  `
        <img src="${products.img}">
        <h3 class="name-product">${products.name}</h3>
        <h6 class="weight">${products.weight}</h6>
        <hr>
        <div class="price">$${products.price}</div>
    `;
    //se agrega el nodo hijo al nodo padre
    content.append(divProducts);

    let btnDiv = document.createElement("div");
    let btnAdd = document.createElement("button");
    btnAdd.innerText = "agregar";
    btnDiv.className = "agregar";
    btnDiv.append(btnAdd);
    
    divProducts.append(btnDiv);

    //Agregando evento click al boton para instanciar la clase "Cart" y almacenar el pedido en un arrays
    btnAdd.addEventListener("click",() =>{
        const repeat = listOrder.some((repeatProduct) => repeatProduct.id === products.id);
        if (repeat) {
            listOrder.map((prod) => {
                if (prod.id === products.id) {
                    prod.cant++;
                }
            });
        } else { 
            const createOrder = new Cart(products.id,products.img,products.name,products.cant,products.price);
            Cart.saveOrder(createOrder,listOrder);
            cartCount();
            localSave();
        }
    });
});
//Obtener IVA
function getIVA(total,IVA){
    return (total*IVA) + total;
}
//Funcion generar numero de seguimiento de pedido aleatorio
function getRandom() {
    return Math.floor(Math.random()*10000000);
}
//Funcion obtener fecha del dia de la compra
function getDate(){
    return new Date().toLocaleDateString();
}
//set localstorage
const localSave = () => {
    localStorage.setItem("listOrder", JSON.stringify(listOrder));
};
