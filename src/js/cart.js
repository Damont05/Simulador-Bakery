
//Clase "Carro" de compras
class Cart {
    constructor(id,img,name,cant,price){
        this.id      =   id;
        this.img     =   img;
        this.name    =   name;
        this.cant    =   cant;
        this.price   =   price;
    }
    //Guardar los pedidos en el localstorage y array
    static saveOrder(order,listOrder){
        listOrder.push(order);
        console.log("****Guardando Pedido****");
    } 

    //Obtener Pedidos y mostrar 
    static getOrder(){
        try {

            cartContainer.innerHTML = "";
            cartContainer.style.display = "flex";
            const cartHeader = document.createElement("div");
            cartHeader.className = "cart-header";
            cartHeader.innerHTML = `
                <h1 class="cart-header-title">Canasta</h1>
            `;
            cartContainer.append(cartHeader);

            //boton salir del carrito de compra
            const cartButton = document.createElement("button");

            cartButton.innerText = '❌';
            cartButton.className = 'cart-header-button';
            cartButton.addEventListener("click", () => {
                cartContainer.style.display = "none";
            });
            cartHeader.append(cartButton);

            //recorro la lista de pedidos de la canasta para mostrarla
            listOrder.forEach((order) => {
                let cartContent = document.createElement("div");
                cartContent.className = "cart-content";
                cartContent.innerHTML = `
                    <img src="${order.img}">
                    <h3>${order.name}</h3>
                    <p>${order.price} $</p>
                    <span class="restar">➖ </span>
                    <p>${order.cant}</p>
                    <span class="sumar">➕</span>
                    <p>=  ${order.cant * order.price} $</p>
                    <span class="delete-product"> ❌ </span>
                `;
                cartContainer.append(cartContent);

                //boton - de la canasta de compras para restar la cantidad del producto
                let restar = cartContent.querySelector(".restar");
                restar.addEventListener("click", () => {
                    if (order.cant !== 1) {
                        order.cant--;
                    }
                    localSave();
                    Cart.getOrder();
                });

                //boton + de la canasta de compras para agregar mas cantidad del producto
                let sumar = cartContent.querySelector(".sumar");
                sumar.addEventListener("click", () => {
                    order.cant++;
                    localSave();
                    Cart.getOrder();
                });

                //eliminar producto de la canasta de pedidos
                let deleteP = cartContent.querySelector(".delete-product");
                deleteP.addEventListener("click", () => {
                    console.log("delete");
                    //llamado a funcion eliminar
                    deleteProduct(order.id);
                });
            });
            //reduce a todos los precios de la canasta para obtener el total
            const total = listOrder.reduce((acum, order) =>acum + order.price * order.cant,0) ;

            const totalIVA = document.createElement("div");
        
            totalIVA.className = "total-content";
            //Total + IVA, se hace llamado a funcion getIva() del main.js
            totalIVA.innerHTML = `Total a pagar  + IVA: $${getIVA(total,IVA)}`;
            cartContainer.append(totalIVA);

            const btnPay = document.createElement("button");
            btnPay.innerText = 'Pagar pedido';
            btnPay.className = 'pay-button';

            btnPay.addEventListener("click", () => {
                cartContainer.style.display = "none";
               
                  Swal.fire (
                    {
                      title: '¿Quieres finalizar el pedido?',
                      icon: 'question',
                      iconColor:  '#cb4335',
                      padding: '1rem',
                      showCancelButton: true,
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'Si',
                      confirmButtonColor: '#3085d6'
                    }) 
                    .then((resultado) => { 
                      if (resultado.isConfirmed) {
                        Pay.getDataClient();
                      } else {
                        Cart.getOrder();
                      }
                    });
                })
            
            totalIVA.append(btnPay);
            
        } catch (error) {
            console.log("Error en el metodo obtener pedidos");
        }
        
    }   
}
//Obtener pedido de la canasta de compras
getCart.addEventListener("click", Cart.getOrder);

//Eliminar productos de la canasta por el id
const deleteProduct = (id) =>{
    try{
        const foundId = listOrder.find((element) => element.id === id);
        console.log(foundId);
        listOrder = listOrder.filter((carritoId) => {
            return carritoId !== foundId;
        });
        cartCount();
        localSave();
        Cart.getOrder();
    }catch (error){
        console.log("error al eliminar");
    }
};
//contador de productos de la canasta
const cartCount=()=>{
    cantCart.style.display = "block";
    const carritoLength = listOrder.length;
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));
    cantCart.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};
cartCount();