
class Pay extends Cart{
    constructor(id,name,cant,price,payMethod,client){
        super(id,name,cant,price),
        this.payMethod  = payMethod,
        this.client     = client
    }
    
    static getDataClient(){

        try {
            containerPay.innerHTML = "";
            containerPay.style.display = "flex";
            const cartHeader = document.createElement("div");
            cartHeader.className = "cart-header";
            cartHeader.innerHTML = `
                <h1 class="cart-header-title">Datos de pago</h1>
            `;
            containerPay.append(cartHeader);
            
            //boton salir 
            const cartButton = document.createElement("button");

            cartButton.innerText = '❌';
            cartButton.className = 'cart-header-button';
            cartButton.addEventListener("click", () => {
                containerPay.style.display = "none";
            });
        
            cartHeader.append(cartButton);

            //Creando formulario por medio de la Libreria Bootstrap
            let containerContent = document.createElement("div");
            containerContent.className = "cart-content-pay";
            containerContent.innerHTML = `
            <div class="modal">
                <form class="form">
                
                <div class="credit-card-info--form">
                    <div class="input_container">
                    <label for="password_field" class="input_label">nombre completo</label>
                    <input id="name" class="input_field" type="text" name="input-name" title="Inpit title" placeholder="Nombre Completo" >
                    <label for="password_field" class="input_label">Dirección de envio</label>
                    <input id="dire" class="input_field" type="text" name="input-name" title="Inpit title" placeholder="Dirección" >
                    </div>
                    <div class="input_container">
                    <label for="password_field" class="input_label">Numero de tarjeta</label>
                    <input id="num" class="input_field" type="number" name="input-name" title="Inpit title" placeholder="0000 0000 0000 0000" >
                    </div>
                    <div class="input_container">
                    <label for="password_field" class="input_label">fecha de expiracion / CVV</label>
                    <div class="split">
                    <input id="exp" class="input_field" type="text" name="input-name" title="Expiry Date" placeholder="01/23" >
                    <input id="cvv" class="input_field" type="number" name="cvv" title="CVV" placeholder="CVV" >
                    </div>
                    </div>
                </div>
                </form>
                </div>
            `;
            containerPay.append(containerContent);
            

            const btnPays = document.createElement("button");
            btnPays.innerText = 'Pagar pedido';
            btnPays.className = 'pay-button-final';

            btnPays.addEventListener("click", () => {

                const name = document.getElementById('name');
                const dire = document.getElementById('dire');
                const num = document.getElementById('num');
                const exp = document.getElementById('exp');
                const cvv = document.getElementById('cvv');
            
                if (name.value === "") {
                    name.focus();
                    return false;
                }else if (dire.value === "") {
                    dire.focus();
                    return false;
                }else if (num.value === "") {
                    num.focus();
                    return false;
                }else if (exp.value === "") {
                    exp.focus();
                    return false;
                }else if (cvv.value === "") {
                    cvv.focus();
                    return false;
                }else{
                    containerPay.style.display = "none";  
                      
                    Swal.fire({
                        html: `<h1>Pedido realizado</h1>
                        <p>Numero de seguimiento de pedido : <strong>${getRandom()}</strong></p>
                        <p>Nombre de Cliente: <strong>${name.value}</strong></p>
                        <p>Direccion de despacho : <strong>${dire.value}</strong></p>
                        <p>Fecha de pedido : <strong>${getDate()}</strong></p>
                        <br>
                        <a href="#">Imprimir ticket</a>
                        `,
                    });
                    //Dejando la canasta vacia despues de pagar 
                    listOrder.splice(0, listOrder.length);
                    //ocultando contador de la canasta al dejarlo en cero
                    cantCart.style.display = "none";
                    return true;
                } 
            })
            containerPay.append(btnPays);
        } catch (error) {
            console.log("Error en el pago");
        }
    }
}



