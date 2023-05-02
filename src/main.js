//********************************************************
/*
*   SIMULADOR             : BAKERY 'ENTREAMASADOS'
*   COMISION JAVASCRIPT   : 51360
*   AUTHOR                : Luis Daniel Montero Falcon
*/
//********************************************************

//Declaro variables publicas
//lista que almacena pedidos como objetos.
const listOrder = [];
//IVA
const IVA = 0.21;

//*************CLASES*************//

//Clase PAY(pagar), paga el pedido y ofrece metodos de pago diferentes
class Pay{
    constructor(paymentMethod){
        this.paymentMethod = paymentMethod;
    }
    static getPaymentMethod(){
        let method; 
        while (isNaN(method) || typeof(Number(method)) !== "number") {
            method = prompt("Selecciona el metodo de pago: \n \n  1 = Tarjeta \n 2 = Transferencia");
        }
        if((method == 1 )||(method == 2)){
            alert("GRACIAS POR TU COMPRA! \n\n Fecha de compra: " + getDate() + " \n\n El numero de seguimiento de tu pedido es: " + getRandom());
        }
    }  
}
//Clase "Carro" de compras, que hereda de la clase PAY(pagar) para obtener el metodo de pago
class Cart extends Pay{
    constructor(nameProduct,price,cant,paymentMethod){
        super(paymentMethod);
        this.nameProduct    =   nameProduct;
        this.price          =   price;
        this.cant           =   cant;
    }
    //Guardar los pedidos en el arrays
    static saveOrder(order,listOrder){
        listOrder.push(order);
        alert("PEDIDO AGREGADO A LA CANASTA");
    }
    //Obtener Pedidos
    static getOrder(){

        //RECORRER el arrays con el MAP para mostrar la data en el confirm
        let men = listOrder.map(order => {
            return `\n * ${order.nameProduct} --- cant: ${order.cant} => precio: $${order.price}`
        });

        //FUNCION REDUCE() sobre los precios de los objetos para obtener el total SIN IVA.
        const total = listOrder.reduce((acum, order) =>{
            return acum + order.price;
        },0);

        const cartOrder=confirm("CANASTA DE PEDIDOS: \n " + men.join("\n") + " \n\n TOTAL+IVA: $" + (getIVA(total,IVA)));
        if (cartOrder == true){
            const metodo = this.getPaymentMethod();
        }else{
            takeOrder();
        }
    }   
}
//*********FIN DE CLASES**********//

//**********PRODUCTOS************//
//Arrays de OBJETOS 
const listProducts = [
    {id : "1", name : "Pan de Viena", price : 200},
    {id : "2", name : "Pan Dulce",    price : 300},
    {id : "3", name : "Pan de Molde", price : 600},
    {id : "4", name : "Pan Integral", price : 400},
    {id : "5", name : "Brownies",     price : 450},
    {id : "6", name : "Croissants",   price : 230},
    {id : "7", name : "Empanada",     price : 390},
    {id : "8", name : "Alfajor",      price : 100},
    {id : "9", name : "Magdalenas",   price : 200},
    {id : "10",name : "Berlines",     price : 300}
]; 
//**********FIN PRODUCTOS************//

//Llamado a la funcion principal que inicia el flujo del simulador.
greet();

//Funcion principal de Bienvenida
function greet(){
    alert("BIENVENIDO/A A LA PANADERIA ONLINE 'ENTREAMASADOS'");
    let askMenu = confirm("Quieres ver el menú?");
    if((askMenu == true) && (askMenu != NaN)){
        takeOrder();
    }else{
        greet();
    }
}
//Funcion 'tomar pedido', puede ser reutilizada cuando se tomen otros pedidos en un solo flujo
function takeOrder(){
    
    let price,priceEnd,total = 0;
    //menú
    let messageMenu = "Selecciona en el menú la opcion en 'numero' del producto que deseas comprar:\n";    
    let productMenu;

    //recorro el arrays con los objetos productos y muestro como menu
    for (let i=0;i<listProducts.length;i++){
        messageMenu += `\n ${listProducts[i].id} = ${listProducts[i].name}:  ......... precio: $${listProducts[i].price}\n`
    }
    //Mostrando menu y valido que entre un numero y no texto
    while (isNaN(productMenu) || typeof(Number(productMenu)) !== "number") {
        productMenu=prompt(messageMenu);
    }

    //METODO DE FILTRADO EN EL ARRAYS para obtener el objeto que coincidad con el id de entrada del prompt
    const res = listProducts.filter( (producto)=> producto.id == productMenu);

    var cant = parseInt(prompt( "Ingrese la cantidad: "));
    total = res[0].price*cant;

    //Si es aceptar(true) agrega el pedido a la canasta y si es cancelar(false) no agrega el producto y redirige al menu
    let confirmOrder = confirm(`¿Quieres agregar a la canasta de compras este pedido?: \n \n PRODUCTO: \n ${res[0].name} \n\n CANTIDAD: \n ${cant} \n\n PRECIO: \n $${total}`); //confirm retorna true/false
    if (confirmOrder == true){
        const createOrder = new Cart(res[0].name,total,cant);
        Cart.saveOrder(createOrder,listOrder);
    }else{
        takeOrder();
    }
    //Si es cancelar(false) redirige a obtener la canasta cn los pedidos y si es aceptar(true) sigue agregando mas pedidos a la canasta
    let otherProduct = confirm('¿Quieres agregar otro producto a la canasta?');
    if(otherProduct ==true){
        takeOrder();
    }else{
        Cart.getOrder();
    }
}
//Obtener IVA
function getIVA(total,IVA){
    return (total*IVA) + total;
}
//Llamado a un nuevo pedido
function newOrder(){
    return takeOrder();
}
//Funcion generar numero de seguimiento de pedido aleatorio
function getRandom() {
    return Math.floor(Math.random()*10000000);
}
//Funcion obtener fecha del dia de la compra
function getDate(){
    return new Date().toLocaleDateString();
}