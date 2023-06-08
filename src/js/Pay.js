class Pay extends Cart{
    constructor(id,name,cant,price,payMethod,client){
        super(id,name,cant,price),
        this.payMethod  = payMethod,
        this.client     = client
    }
    static myFunction(){
        
        Swal.fire({
            html: `<h1>Pedido realizado</h1>
            <p>Numero de seguimiento de pedido : <strong>${getRandom()}</strong></p>
            <br>
            <a href="#">Imprimir ticket</a>
            `,
        });

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
            containerContent.className = "cart-content";
            containerContent.innerHTML = `
            <div class="modal">
                <form class="form">
                
                <div class="credit-card-info--form">
                    <div class="input_container">
                    <label for="password_field" class="input_label">nombre completo</label>
                    <input id="password_field" class="input_field" type="text" name="input-name" title="Inpit title" placeholder="Nombre Completo" >
                    <label for="password_field" class="input_label">Dirección de envio</label>
                    <input id="password_field" class="input_field" type="text" name="input-name" title="Inpit title" placeholder="Dirección" >
                    </div>
                    <div class="input_container">
                    <label for="password_field" class="input_label">Numero de tarjeta</label>
                    <input id="password_field" class="input_field" type="number" name="input-name" title="Inpit title" placeholder="0000 0000 0000 0000" >
                    </div>
                    <div class="input_container">
                    <label for="password_field" class="input_label">fecha de expiracion / CVV</label>
                    <div class="split">
                    <input id="password_field" class="input_field" type="text" name="input-name" title="Expiry Date" placeholder="01/23" >
                    <input id="password_field" class="input_field" type="number" name="cvv" title="CVV" placeholder="CVV" >
                    </div>
                    </div>
                </div>
                    <button type="submit" onclick="Pay.myFunction()" class="purchase--btn">Finalizar Pedido</button>
                </form>
                </div>
            `;
            containerPay.append(containerContent);
            
        } catch (error) {
            console.log("Error en el pago");
        }
        
    }


}