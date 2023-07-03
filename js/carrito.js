
// pequeña validacion del carrito, traemos el carrito del local storage, en caso de que no este el carrito
//  en el local Storage, vamos a devolver el array vacio
let storageCart = JSON.parse(localStorage.getItem('carrito')) || []

// traemos la cantidad total que fue guardada en el local Storage
const cantidadTotalCart = JSON.parse(localStorage.getItem('acumularCantidadTotal'))

// funcion para acumular el total de todos los productos del carrito, cantidad x precio = total
const totalProducts = storageCart.reduce((total, product) => total + (product.cant * product.precio), 0)

// funcion para actualzar la cantidad y mostrar en el HTML
const actualizarCant = () => {

    // utilizamos reduce para acumular la nueva cantidad total de los productos
    const cantActualizada = storageCart.reduce((acumuladorCantidad, cantidad) => acumuladorCantidad + cantidad.cant, 0)

    // guardamos la nueva cantidad en el local storage
    localStorage.setItem('acumularCantidadTotal', JSON.stringify(cantActualizada))

    // mostramos la nueva cantidad en el HTML
    document.getElementById("cnt").innerHTML = cantActualizada
}

// ejecutamos funcion
actualizarCant()

// funcion para mostrar todas las cards en el HTML
const mostrarCards = (card) => { document.getElementById('tablaProductos').innerHTML = card }

// funcion para mostrar el resumen del precio de todos los productos
const mostrarResumen = (precios) => {

    // primero mostramos todos los precios acumulador y despues mostramos la cantidad total de todos estos
    document.getElementById('tablaTotal').innerHTML = `${precios}
    <tr>
    <th>.</th>
    <td id="total">Total: $${totalProducts}</td>
    </tr>`
}

// en esta funcion tenemos ta la logica de la tabla de los productos a mostrar en el HTML
const mostrarTabla = (carrito) => {

    // mostramos la tabla con los titulos en esta variable, luego se acumularan las cards de los productos abajo
    let acumuladorDeCards = `<thead class="table-h" id="tablaTitulo">
    <tr>
        <th scope="col">#</th>
        <th scope="col">PRODUCTO</th>
        <th scope="col">PRECIO</th>
        <th scope="col">CANTIDAD</th>
        <th scope="col">SUBTOTAL</th>
    </tr>
    </thead>`;

    // mostramos el titulo del resumen de la tabla, luego se acumularan los precios abajo
    let acumuladorResumen = `<tr>
        <th class="text-center align-middle">#</th>
        <th class="text-center fs-6">RESUMEN DE COMPRA</th>
        </tr>`;

    let botonCompra = document.getElementById("botonCompra")
    botonCompra.innerHTML = `<button class="btn-cart btn-outline-dark buy align-self-end" id="comprar">Comprar</button>`

    // esta variable es solo para mostrar la numeracion de la tabla a mostrar
    let numeracion = 0

    // usamos forEach para utilizar las propiedades del carrito
    carrito.forEach((product) => {

        // guardamos el total de cada producto por separado, precio por cantidad
        let cantPorProducto = product.precio * product.cant

        // acumulamos la numeracion para que no se repitan en la tabla a mostrar
        numeracion += 1

        // esta es la acumulacion de cards que se van a mostrar abajo de la tabla con los titulos
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

        // ejecutamos funcion para mostrar el resultado con el titlo y las cards acumuladas
        mostrarCards(acumuladorDeCards)

        // esta es la acumulacion de precios que se van a mostrar abajo del titulo del resumen
        acumuladorResumen += `<tr>
        <th class="text-center">${numeracion}</th>
        <td id="totalPorCantidad1">$${cantPorProducto}</td>
        </tr>`

        // ejecutamos funcion para mostrar resultado con el titulo, la acumulacion de precios y la cantidad total de todos los productos
        mostrarResumen(acumuladorResumen)

    })

    // usamos forEach para utilizar las propiedades de los productos del carrito
    storageCart.forEach((e) => {

        // seleccionamos la id del boton para poder sumar la cantidad del producto
        const sumarCantidad = document.getElementById(`sumar${e.id}`);
        sumarCantidad.addEventListener('click', function () {

            // ejecutamos funcion para sumar con la id del producto
            sumarCant(e.id)
        })

        // seleccionamos la id del boton para poder restar la cantidad del producto
        const restarCantidad = document.getElementById(`restar${e.id}`);
        restarCantidad.addEventListener('click', function () {

            // ejecutamos funcion para restar con la id del producto
            restaCant(e.id)
        })
    })

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
                        localStorage.setItem('carrito', JSON.stringify(storageCart))           
                        swal(`Poof! tu Compra ah sido finalizada \n Puedes Vovler a comprar cuando quieras ;)`, {
                            icon: "success",
                        });
                } else {
                    swal("puedes editar tu compra");       //en caso que sea falso
                    mostrarTabla(storageCart)
                }
            });
    })
}

// ejecutamos funcion para mostrar la tabla de productos con el resumen
mostrarTabla(storageCart)


// funcion para sumar la cantidad del producto
const sumarCant = (id) => {

    // guardamos el producto en la variable para poder utilizar sus propiedades
    let suma = storageCart.find(e => e.id === id)

    // validacion para que la cantidad del producto no sobrepase el stock
    if (suma.cant < suma.stock) {

        // el usuario va a poder sumar siempre que este dentro del stock del producto
        suma.cant = suma.cant + 1

        // ejecutamos la funcion para mostrar la cantidad en el HTML
        actualizarCant()

        // vamos guardando los nuevos resultados de la interaccion del usuario al carrito
        localStorage.setItem('carrito', JSON.stringify(storageCart))

        // vamos actualizando el HTML
        mostrarTabla(storageCart)
    }
}

// funcion para vaciar el carrito
const clear = () => {

    document.getElementById('tablaProductos').innerHTML = `
    <div 
    style=" display: flex; justify-content: space-evenly;">
    No Hay productos en el carrito 
    </div>`
    document.getElementById('tablaTotal').innerHTML = ""
    document.getElementById("botonCompra").innerHTML = "<div disbled></div>"
    return storageCart = []
}

const removeItem = (id) => {

    const sacoArray = storageCart.filter((product) => product.id !== id)

    localStorage.setItem('carrito', JSON.stringify(sacoArray))

    storageCart = JSON.parse(localStorage.getItem('carrito'))

    clear()

    return mostrarTabla(storageCart)
}

// funcion para restar la cantidad del producto
const restaCant = (id) => {

    let resta = storageCart.find(e => e.id === id)

    resta.cant = resta.cant - 1

    actualizarCant()

    mostrarTabla(storageCart)

    resta.cant == 0 ? removeItem(resta.id) : localStorage.setItem('carrito', JSON.stringify(storageCart))

    mostrarTabla(storageCart)
}

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
    });
}