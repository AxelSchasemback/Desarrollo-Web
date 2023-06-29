let storageCart = JSON.parse(localStorage.getItem('carrito')) || []

const cantidadTotalCart = JSON.parse(localStorage.getItem('acumularCantidadTotal'))

const totalProducts = storageCart.reduce((total, product) => total + (product.cant * product.precio), 0)

const actualizarCant = () => {
    const cantActualizada = storageCart.reduce((acumuladorCantidad, cantidad) => acumuladorCantidad + cantidad.cant, 0)
    localStorage.setItem('acumularCantidadTotal', JSON.stringify(cantActualizada))
    const muestroCant = document.getElementById("cnt").innerHTML = cantActualizada
}

actualizarCant()

const mostrarCards = (card) => { document.getElementById('tablaProductos').innerHTML = card }

const mostrarResumen = (card) => {
    document.getElementById('tablaTotal').innerHTML = `${card}
<tr>
<th>.</th>
<td id="total">Total: $${totalProducts}</td>
    </tr>`}

const mostrarTabla = (carrito) => {

    let acumuladorResumen = `<tr>
        <th class="text-center align-middle">#</th>
        <th class="text-center fs-6">RESUMEN DE COMPRA</th>
        </tr>`;

    let acumuladorDeCards = `<thead class="table-h" id="tablaTitulo">
    <tr>
        <th scope="col">#</th>
        <th scope="col">PRODUCTO</th>
        <th scope="col">PRECIO</th>
        <th scope="col">CANTIDAD</th>
        <th scope="col">SUBTOTAL</th>
    </tr>
    </thead>`;

    let numeracion = 0

    carrito.forEach((product) => {

        let cantPorProducto = product.precio * product.cant

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
                <i class="sum bi bi-cart-plus-fill" id="sumar${product.id}"></i>
                <span class="fs-4" id="cnt-prod1">${product.cant}</span>
                <i class="min bi bi-cart-dash-fill" id="restar${product.id}"></i>
            </div>
        </td >
        <td class="text-center align-middle mark" id="totalProducto">$${cantPorProducto}</td>
    </tr >`
        mostrarCards(acumuladorDeCards)

        acumuladorResumen += `<tr>
        <th class="text-center">${numeracion}</th>
        <td id="totalPorCantidad1">$${cantPorProducto}</td>
        </tr>`

        mostrarResumen(acumuladorResumen)

    })


    const busco = storageCart.forEach((e) => {

        const sumarCantidad = document.getElementById(`sumar${e.id}`);
        sumarCantidad.addEventListener('click', function () {
            sumarCant(e.id)
        })

        const restarCantidad = document.getElementById(`restar${e.id}`);
        restarCantidad.addEventListener('click', function () {
            restaCant(e.id)
        })
    })
}

mostrarTabla(storageCart)

const sumarCant = (id) => {

    let recorrido = storageCart.find(e => e.id === id)
    if (recorrido.cant < recorrido.stock) {
        recorrido.cant = recorrido.cant + 1
        actualizarCant()
    }
    localStorage.setItem('carrito', JSON.stringify(storageCart))
    mostrarTabla(storageCart)
}

const restaCant = (id) => {

    let recorrido = storageCart.find(e => e.id === id)
    if (recorrido.cant > 0) {
        recorrido.cant = recorrido.cant - 1
        actualizarCant()
    }
    localStorage.setItem('carrito', JSON.stringify(storageCart))
    mostrarTabla(storageCart)
}







