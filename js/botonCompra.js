// separamos archivo Js para que no sea tan emborroso

// seleccionamos id en el HTML
let botonCompra = document.getElementById("botonCompra")


// mostramos el boton de comprar en el HTML
botonCompra.innerHTML = `<button class="btn-cart btn-outline-dark buy align-self-end" id="comprar">Comprar</button>`


// seleccionamos el boton anterior y usamos la funcion de escuchá 'click'
const finalizarCompra = document.getElementById('comprar')
finalizarCompra.addEventListener('click', () => {

    // utilizamos la biblioteca Sweet Alert, mostramos las siguientes propiedades
    swal({
        title: "estas seguro con tus productos?",
        text: "una vez que toques el boton ok, finalizara tu compra!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((sicompra) => {
            if (sicompra) {              //si compra es Verdadero
                removeStock(),              //ejecutamos las siguientes funciones
                    clear(),
                    totalProducts,
                    mostrarCards(storageCart),
                    actualizarCant(),
                    localStorage.removeItem('carrito'),              //borramos todo el carrito del localStorage

                    swal(`Poof! tu Compra ah sido finalizada \n Puedes Vovler a comprar cuando quieras ;)`, {
                        icon: "success",
                    });
            } else {
                swal("puedes editar tu compra");                 //en caso que sea falso
            }
        });
})

// funcion para vaciar el carrito, PD: no era muy necesaria la funcion xd
const clear = () => storageCart = []

// funcion para actualizar el stock de los productos despues de la compra
const removeStock = () => {

    // forEach para utilizar las propiedades de los productos del carrito
    storageCart.forEach((product) => {

        // variable que trae el nuevo stock del producto, 
        // si no hay nuevo stock vamos a utiliar el stock del producto
        let stockProducto = localStorage.getItem(`storageEnStock${product.id}`) || product.stock

        // hacemos la resta del stock menos la cantidad pedida y la guardamos
        stockProducto = stockProducto - product.cant

        // guardamos esta nueva cantidad en el localStorage
        localStorage.setItem(`storageEnStock${product.id}`, JSON.stringify(stockProducto))

        // guardamos el nuevo stock del producto
        localStorage.setItem(`carrito`, JSON.stringify(product))
    });
}


