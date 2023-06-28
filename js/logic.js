let cart = validarStorageCarrito()
const total = 0

const addItem = (category, name, id, precio, imgP, stock, quantity) => {
    if (isInCart(id)) {
        let findCart = cart.find(producto => producto.id == id)
        if (findCart.cant < stock) { findCart.cant = findCart.cant + quantity }
        cart = [...cart]
        acumuladorCantidad()
    }
    else {
        cart = [...cart, { category: category, name: name, id: id, precio: precio, imgP: imgP, stock: stock, cant: quantity }]
        acumuladorCantidad()
    }
}

const search = (id) => cart.find( product => product.id == id)

const clear = () => cart = []

const isInCart = (id) => cart.find(product => product.id === id)

const removeItem = (id) => cart.filter(product => product.id !== id)

const acumuladorCantidad = () => {
    const cantTotal = cart.reduce((cantidad, product) => cantidad + product.cant, 0)
    localStorage.setItem('acumularCantidadTotal', JSON.stringify(cantTotal))
    const cantidad = document.getElementById("cnt").innerHTML = cantTotal
}

const totalProducts = cart.reduce((total, product) => total + (product.cant * product.precio), 0)


function validarStorageCarrito() {
    const validarStoragecart = JSON.parse(localStorage.getItem('carrito'))
    return validarStoragecart == null ? [] : JSON.parse(localStorage.getItem('carrito'))
}