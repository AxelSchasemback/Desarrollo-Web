const total = 0
let cart = validarStorageCarrito()

const tituloCards = document.getElementById("titleDestacado")
const cardsDestacadas = document.getElementById("cardsDestacados");

// fetch('../data.json')
//     .then( (res) => res.json())
//     .then( (data) => productos = data.productos)

function generadorCards(producto) {

    tituloCards.innerHTML = `<th class="title-h">            
    <h1 class="title-card">Productos Destacados</h1>
    </th>`

    cardsDestacadas.innerHTML = ''

    const prueba = [producto[1], producto[2], producto[3], producto[4]]

    const prod = prueba.forEach(e => {
        let card = document.createElement('td')
        card.className = "prdt-1 card-product"
        card.innerHTML = `<div class="fond-card1">
        <img class="img-p" src="./img/productos/${e.img}" alt=${e.img}>
        <span class="stock" id="segunStock">stock</span>
        <span class="fav-start fa fa-star"></span>
        <div class="col-md-subCard">
        <p class="name-prod">${e.nombre}</p>
        <span class="price-prod">$${e.precio}</span>
        <button class="btn-cart btn-outline-dark" id="btnBuy${e.id}">
        Add to Cart
        </button>
        </div>
        </div>`
        cardsDestacadas.appendChild(card)
    })
    
    const prod2 = prueba.forEach(e => {
        const buyBtn = document.getElementById(`btnBuy${[e.id]}`);
        buyBtn.addEventListener('click', function () {
            addItem(e.categoria, e.nombre, e.id, e.precio, e.img, 1)
            localStorage.setItem('carrito', JSON.stringify(cart))
        })
    })
}

generadorCards(productos)

const addItem = (category, name, id, precio, imgP, quantity) => {
    if (isInCart(id)) {
        let findCart = cart.find(producto => producto.id == id)
        findCart.cant = findCart.cant + quantity
        cart = [...cart]
    }
    else {
        cart = [...cart, { category: category, name: name, id: id, precio: precio, imgP: imgP, cant: quantity }]
    }
}

const clear = () => cart = []

const isInCart = (id) => cart.find(product => product.id === id)

const removeItem = (id) => cart.filter(product => product.id !== id)

const cantTotal = () => cart.reduce((cantidad, product) => cantidad + product.cant, 0)

const totalProducts = () => cart.reduce((total, product) => total + (product.cant * product.precio), 0)

function validarStorageCarrito() {
    const validarStoragecart = JSON.parse(localStorage.getItem('carrito'))
    return validarStoragecart == null ? [] : JSON.parse(localStorage.getItem('carrito'))
}