// un poco de Js para el carrito, solo para que sea un poco dinamico, no esta bien aplicado

let cantidad = 0;
let cantCarrito = 3;
let cantProducto1 = 1;
let cantProducto2 = 1;
let cantProducto3 = 1;
let totalProducto1 = 9205;
let totalProducto2 = 6199;
let totalProducto3 = 9013;
let total = 0;


function totalCart() {
    total = totalProducto1 + totalProducto2 + totalProducto3;
}

const agregar1 = () => {
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

const agregar2 = () => {
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
            background: "linear-gradient(313deg, #ffc107, #e13b11, #00000080)"
        },
        onClick: function () { } // Callback after click
    }).showToast();
}

function addCart1() {
    cantCarrito += 1;
    cantProducto1 += 1;
    totalProducto1 += 9205;
    document.getElementById('totalProducto1').innerHTML = `$${totalProducto1}`
    document.getElementById('totalPorCantidad1').innerHTML = `$${totalProducto1}`
    totalCart()
    document.getElementById('total').innerHTML = `total: $${total}`;
    document.getElementById('cnt-cart').innerHTML = cantCarrito;
    if (cantProducto1 > 0) {
        document.getElementById('remove1').innerHTML =
            `<i class="sum bi bi-cart-plus-fill" onclick=addCart1()></i>
        <span class="fs-4" id="cnt-prod1">${cantProducto1}</span>
        <i class="min bi bi-cart-dash-fill"
        onclick=remvCart1()></i>`
    }
}

function remvCart1() {
    cantCarrito -= 1;
    cantProducto1 -= 1;
    totalProducto1 -= 9205;
    document.getElementById('totalProducto1').innerHTML = `$${totalProducto1}`
    document.getElementById('totalPorCantidad1').innerHTML = `$${totalProducto1}`
    totalCart()
    document.getElementById('total').innerHTML = `total: $${total}`;
    document.getElementById('cnt-cart').innerHTML = cantCarrito;
    document.getElementById('cnt-prod1').innerHTML = cantProducto1;
    if (cantProducto1 == 0) {
        document.getElementById('remove1').innerHTML =
            `<i class="sum bi bi-cart-plus-fill" onclick=addCart1()></i>
        <span class="fs-4" id="cnt-prod1">${cantProducto1}</span>`
    }
}


function addCart2() {
    cantCarrito += 1;
    cantProducto2 += 1;
    totalProducto2 += 6199;
    document.getElementById('totalProducto2').innerHTML = `$${totalProducto2}`
    document.getElementById('totalPorCantidad2').innerHTML = `$${totalProducto2}`
    totalCart()
    document.getElementById('total').innerHTML = `total: $${total}`;
    document.getElementById('cnt-cart').innerHTML = cantCarrito;
    if (cantProducto2 > 0) {
        document.getElementById('remove2').innerHTML =
            `<i class="sum bi bi-cart-plus-fill" onclick=addCart2()></i>
        <span class="fs-4" id="cnt-prod2">${cantProducto2}</span>
        <i class="min bi bi-cart-dash-fill"
        onclick=remvCart2()></i>`
    }
}

function remvCart2() {
    cantCarrito -= 1;
    cantProducto2 -= 1;
    totalProducto2 -= 6199;
    document.getElementById('totalProducto2').innerHTML = `$${totalProducto2}`
    document.getElementById('totalPorCantidad2').innerHTML = `$${totalProducto2}`
    totalCart()
    document.getElementById('total').innerHTML = `total: $${total}`;
    document.getElementById('cnt-cart').innerHTML = cantCarrito;
    document.getElementById('cnt-prod2').innerHTML = cantProducto2;
    if (cantProducto2 == 0) {
        document.getElementById('remove2').innerHTML =
            `<i class="sum bi bi-cart-plus-fill" onclick=addCart2()></i>
        <span class="fs-4" id="cnt-prod2">${cantProducto2}</span>`
    }
}

function addCart3() {
    cantCarrito += 1;
    cantProducto3 += 1;
    totalProducto3 += 9013;
    document.getElementById('totalProducto3').innerHTML = `$${totalProducto3}`
    document.getElementById('totalPorCantidad3').innerHTML = `$${totalProducto3}`
    totalCart()
    document.getElementById('total').innerHTML = `total: $${total}`;
    document.getElementById('cnt-cart').innerHTML = cantCarrito;
    if (cantProducto3 > 0) {
        document.getElementById('remove3').innerHTML =
            `<i class="sum bi bi-cart-plus-fill" onclick=addCart3()></i>
            <span class="fs-4" id="cnt-prod3">${cantProducto3}</span>
            <i class="min bi bi-cart-dash-fill" onclick=remvCart3()></i>`
    }
}

function remvCart3() {
    cantCarrito -= 1;
    cantProducto3 -= 1;
    totalProducto3 -= 9013;
    document.getElementById('totalProducto3').innerHTML = `$${totalProducto3}`
    document.getElementById('totalPorCantidad3').innerHTML = `$${totalProducto3}`
    totalCart()
    document.getElementById('total').innerHTML = `total: $${total}`;
    document.getElementById('cnt-cart').innerHTML = cantCarrito;
    document.getElementById('cnt-prod3').innerHTML = cantProducto3;
    if (cantProducto3 == 0) {
        document.getElementById('remove3').innerHTML =
            `<i class="sum bi bi-cart-plus-fill" onclick=addCart3()></i>
        <span class="fs-4" id="cnt-pro3">${cantProducto3}</span>`
    }
}


function finalizarCompra() {
    swal({
        title: "estas seguro con tus productos?",
        text: "una vez que toques el boton ok, finalizara tu compra!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((sicompra) => {
            if (sicompra) {
                document.getElementById('cnt-cart').innerHTML = 0;
                document.getElementById('tablaProductos').innerHTML = `<b class="fs-3">Tu Carrito esta vacio</b>`
                document.getElementById('tablaTotal').innerHTML = '...'
                document.getElementById('tablaTitulo').innerHTML = '...'
                    swal(`Poof! tu Compra ah sido finalizada \n Puedes Vovler a comprar cuando quieras ;)`, {
                        icon: "success",
                    });
            } else {
                swal("puedes editar tu compra");
            }
        });
}


