let cantidad = 0;
let cantCarrito = 3;
let cantProducto = 1;

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
    cantidad += 1
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


const addCart = () => {
    cantCarrito += 1;
    cantProducto += 1;
    document.getElementById('cnt-cart').innerHTML = cantCarrito;
    document.getElementById('cnt-prod').innerHTML = cantProducto;
}

const remvCart = () => {
    cantCarrito -= 1;
    cantProducto -= 1;
    document.getElementById('cnt-cart').innerHTML = cantCarrito;
    document.getElementById('cnt-prod').innerHTML = cantProducto;
    if (cantProducto <= 0) {
        document.getElementById('remove').innerHTML =
            `<i class="sum bi bi-cart-plus-fill" onclick=addCart()></i>
        <span class="fs-4" id="cnt-prod">1</span>
        <i class="min bi bi-cart-dash-fill" style="
        display: none;" onclick=remvCart()></i>`
    }
    else { document.getElementById('remove').innerHTML =
            `<i class="sum bi bi-cart-plus-fill" onclick=addCart()></i>
        <span class="fs-4" id="cnt-prod">1</span>
        <i class="min bi bi-cart-dash-fill" style="
        /* display: none; */" 
        onclick=remvCart()></i>`
    }
}

