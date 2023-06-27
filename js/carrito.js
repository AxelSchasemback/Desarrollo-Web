let storageCart = JSON.parse(localStorage.getItem('carrito')) || []
const cantidadTotalCart = JSON.parse(localStorage.getItem('acumularCantidadTotal'))
const actualizarCant = () => {
    const cantActualizada = storageCart.reduce((acumuladorCantidad, cantidad) => acumuladorCantidad + cantidad.cant, 0)
    localStorage.setItem('acumularCantidadTotal', JSON.stringify(cantActualizada))
    const muestroCant = document.getElementById("cnt").innerHTML = cantActualizada
}
actualizarCant()

const mostrarCards = (card) => { document.getElementById('tablaProductos').innerHTML = card }

const mostrarTabla = (product) => {

    let acumuladorDeCards = ``;

    for (let i = 0; i <= product.length; i++) {

        const cantPorProducto = product[i].cant * product[i].precio

        acumuladorDeCards += `<tr class="table-scale">
        <th class="align-middle" scope="row">${i + 1}</th>
        <td>
            <div class="desc col-sm-1 col-10 d-flex p-2 w-100">
                <img class="cart-img" src="../img/productos/${product[i].imgP}" alt=${product[i].name}>
                    <h2 class="fs-4 w-100 align-middle text-center"> ${product[i].name} </h2>
            </div>
        </td>
        <td class="text-center align-middle" id="precio">$${product[i].precio}</td>
        <td class="text-center align-middle">
            <div class="d-flex flex-column">
                <i class="sum bi bi-cart-plus-fill" onclick=addCart()"></i>
                <span class="fs-4" id="cnt-prod1">${product[i].cant}</span>
                <i class="min bi bi-cart-dash-fill" onclick=remCart()"></i>
            </div>
        </td >
        <td class="text-center align-middle mark" id="totalProducto">$${cantPorProducto}</td>
    </tr >`
        mostrarCards(acumuladorDeCards)

    };
    // const recorrerArray = product.forEach( e => {
        
    //     const sumarCart = document.getElementById(`suma${e.id}`);
    //     sumarCart.addEventListener('click', function () {
    //         e.cant + 1
    //         actualizarCant()
    //      });
    // })


    const restaCart = document.getElementById(`resta${product[i].id}`)

}

mostrarTabla(storageCart)


const agregar = () => {
    cantidad += 1;
    document.getElementById('cnt').innerHTML = cantidad
    Toastify({
        text: `Agregaste Producto al carrito`,
        duration: 2000,
        destination: "carrito.html",
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(313deg, #0dcaf0, #0842988a, #00000080)"
        },
        onClick: function () { } // Callback after click
    }).showToast();
}

function remvCart() {
    
    if (cantProducto1 == 0) {
        document.getElementById('remove').innerHTML =
            `<i class="sum bi bi-cart-plus-fill" onclick=addCart1()></i>
        <span class="fs-4" id="cnt-prod1">${cantProducto1}</span>`
    }
}