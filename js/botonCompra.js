
let productosSinStock = sinStock()

function sinStock() {
    const validarStorageStock = JSON.parse(localStorage.getItem('sinStock'))
    return validarStorageStock == null ? [] : JSON.parse(localStorage.getItem('sinStock'))
}

let botonCompra = document.getElementById("botonCompra")

botonCompra.innerHTML = `<button class="btn-cart btn-outline-dark buy align-self-end" id="comprar">Comprar</button>`

const finalizarCompra = document.getElementById('comprar')
finalizarCompra.addEventListener('click', () => {
    swal({
        title: "estas seguro con tus productos?",
        text: "una vez que toques el boton ok, finalizara tu compra!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((sicompra) => {
            if (sicompra) {
                clear()
                mostrarTabla(storageCart),
                    totalProducts
                actualizarCant(),
                    localStorage.removeItem('carrito'),
                    swal(`Poof! tu Compra ah sido finalizada \n Puedes Vovler a comprar cuando quieras ;)`, {
                        icon: "success",
                    });
            } else {
                swal("puedes editar tu compra");
            }
        });
})

const clear = () => storageCart = []

const removeItem = (id) => {
    let selecProducto = storageCart.find((buscar) => buscar.id == id)
    let stockProducto = selecProducto.stock
    stockProducto = stockProducto - selecProducto.cant
    localStorage.setItem(`storageEnStock${id}`, stockProducto)
    if (stockProducto <= 0) {
        const buscarStockVacio = storageCart.find((buscar) => buscar.id == id)
        productosSinStock.push(buscarStockVacio)
        localStorage.setItem(`sinStock`, JSON.stringify(productosSinStock))
    }
}


