//************
/*
*   SIMULADOR             : BAKERY 'ENTREAMASADOS(v1)'
*   DESAFIO 1 (coderhouse) 
*   COMISION JAVASCRIPT   : 51360
*   AUTHOR                : Luis Daniel Montero Falcon
*/
//*************

//Llamado a la funcion principal que inicia el flujo del simulador.
greet();

//Funcion principal de Bienvenida
function greet(){
    alert("BIENVENIDO/A A LA PANADERIA ONLINE 'ENTREAMASADOS'");
    let askMenu = confirm("Quieres ver el menú?");
    console.log(askMenu);
    if((askMenu == true) && (askMenu != NaN)){
        takeOrder();
    }else{
        greet();
    }
}
//Funcion 'tomar pedido', puede ser reutilizada cuando se tomen otros pedidos en un solo flujo
function takeOrder(){
    //declarar variables
    const IVA11 = 0.21;
    let option1 = 1;
    let option2 = 2;
    let option3 = 3;
    let option4 = 4;
    let price,priceEnd,total = 0;
    //menú
    let productMenu=0;
    productMenu = parseInt(prompt( "Selecciona en el menú la opcion en 'numero' del producto que deseas comprar:"+
                                        "\n \n 1 = Pan Frances \n 2 = Pan Dulce \n 3 = Sandwich \n 4 = SALIR" ));
    //iterando entre las opciones hasta encontrar la coincidencia con la entrada.
    for (var i=1; i=productMenu; i++){

        if ( productMenu == i ){  
            if(productMenu == option1)  {
                price   = 300;
            }else if(productMenu == option2){
                price   = 400;
            }else if(productMenu == option3){
                price   = 500;
            }else if(productMenu == option4){
                alert("GRACIAS POR TU VISITA!");
    break;
            }
        }
        var cant = parseInt(prompt( "Ingrese la cantidad: "));
        total = price*cant;
        //precio final + IVA
        priceEnd = ((getIVA(total,IVA11))+total);
        alert("PRECIO TOTAL A PAGAR + IVA: $"+priceEnd);
        let otherProduct = confirm("Quieres comprar otro producto?"); //confirm retorna true/false
        if(otherProduct == false){
            alert("Gracias por tu compra! Pronto recibirás el pedido. \n \n Numero de pedido: " + getRandom());
            greet();
        }else{
            takeOrder();
        }
    }
}
//Obtener precio final con IVA, puede ser reutilizada 
function getIVA(total,IVA){
    return total*IVA;
}
//Llamado a un nuevo pedido
function newOrder(){
    return takeOrder();
}
//Funcion generar numero de seguimiento de pedido aleatorio
function getRandom() {
    return Math.floor(Math.random()*5000000);
}
  

