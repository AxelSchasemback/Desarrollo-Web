let storageCart = JSON.parse(localStorage.getItem('carrito')) || []
const cantidadTotalCart = JSON.parse(localStorage.getItem('acumularCantidadTotal'))
const actualizarCant = () => {
    const cantActualizada = storageCart.reduce((acumuladorCantidad, cantidad) => acumuladorCantidad + cantidad.cant, 0)
    localStorage.setItem('acumularCantidadTotal', JSON.stringify(cantActualizada))
    const muestroCant = document.getElementById("cnt").innerHTML = cantActualizada
}
actualizarCant()

const mostrarCards = (card) => { document.getElementById('tablaProductos').innerHTML = card }

const mostrarTabla = (carrito) => {

    let acumuladorDeCards = ``;
    let numeracion = 0

    const prod3 = carrito.forEach((product) => {

        const cantPorProducto = product.precio * product.cant

        numeracion += 1

        acumuladorDeCards += `<tr class="table-scale">
        <th class="align-middle" scope="row">${numeracion}</th>
        <td>
            <div class="desc col-sm-1 col-10 d-flex p-2 w-100">
                <img class="cart-img" src="../img/productos/${product.imgP}" alt=${product.name}>
                    <h2 class="fs-4 w-100 align-middle text-center"> ${product.name} </h2>
            </div>
        </td>
        <td class="text-center align-middle" id="precio">$${product.precio}</td>
        <td class="text-center align-middle">
            <div class="d-flex flex-column id="movement">
                <i class="sum bi bi-cart-plus-fill" id="sumar${product.id}")"></i>
                <span class="fs-4" id="cnt-prod1">${product.cant}</span>
                <i class="min bi bi-cart-dash-fill" id="restar")"></i>
            </div>
        </td >
        <td class="text-center align-middle mark" id="totalProducto">$${cantPorProducto}</td>
    </tr >`
        mostrarCards(acumuladorDeCards)
    })

    const recorrerCompra = storageCart.forEach(recorrido => {
        const sumarCant = document.getElementById(`sumar${recorrido.id}`);
        sumarCant.addEventListener('click', function () {
            addItem(recorrido.category, recorrido.name, recorrido.id, recorrido.precio, recorrido.imgP, recorrido.stock, 1)
            recorrido.cant = recorrido.cant + 1
            localStorage.setItem('carrito', JSON.stringify(cart))
            actualizarCant()
            if (recorrido.cant == 0) {
                document.getElementById('movement').innerHTML =
                    `<i class="sum bi bi-cart-plus-fill" onclick=addCart(${recorrido.id})></i>
                <span class="fs-4" id="cnt-prod2">${recorrido.cant}</span>
                <i class="min bi bi-cart-dash-fill"
                onclick=remvCart(${recorrido.id})></i>`
            }
        })

        const restarCant = document.getElementById(`restar${recorrido.id}`);
        sumarCant.addEventListener('click', function () {
            addItem(recorrido.category, recorrido.name, recorrido.id, recorrido.precio, recorrido.imgP, recorrido.stock, -1)
            recorrido.cant = recorrido.cant - 1
            if (recorrido.cant == 0) {
                document.getElementById('movement').innerHTML =
                    `<i class="sum bi bi-cart-plus-fill" onclick=addCart(${buscarProducto.id})></i>
                <span class="fs-4" id="cnt-prod1">${cantPorProducto}</span>`
            }
        })
    });

}

mostrarTabla(storageCart)









