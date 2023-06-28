
fetch('../data.json')
    .then((res) => res.json())
    .then((data) => {
        productos = data.productos
        generadorCardsDestacadas(productos, tituloCards1, cardsDestacadas, 1, 11, 1, 4, 19, "Productos Destacados")

        generadorCardsDestacadas(productos, tituloCards2, cardsCombos, 2, 25, 27, 20, 23, "Combos Destacados")

        generadorCardsDestacadas(productos, tituloCards3, cardsOfertas, 1, 13, 15, 14, 12, "Mejores Ofertas")
    })



const tituloCards1 = document.getElementById("titleDestacado")
const tituloCards2 = document.getElementById("titleCombos")
const tituloCards3 = document.getElementById("titleOfertas")
const cardsDestacadas = document.getElementById("cardsDestacados")
const cardsCombos = document.getElementById("cardsCombos")
const cardsOfertas = document.getElementById("cardsOfertas")

function generadorCardsDestacadas(producto, param, param2, num, num1, num2, num3, num4, param3) {

    param.innerHTML = `<th class="title-h">            
    <h1 class="title-card">${param3}</h1>
    </th>`

    param2.innerHTML = '';

    const seleccion = [producto[num1], producto[num2], producto[num3], producto[num4]]

    const prod = seleccion.forEach(e => {
        let card = document.createElement('td')
        card.className = "prdt-1 card-product"
        card.innerHTML = `<div class="fond-card${num}">
        <img class="img-p" src="../img/productos/${e.img}" alt=${e.img}>
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
        param2.appendChild(card)
    })

    const prod2 = seleccion.forEach(e => {
        const buyBtn = document.getElementById(`btnBuy${[e.id]}`);
        buyBtn.addEventListener('click', function () {
            addItem(e.categoria, e.nombre, e.id, e.precio, e.img, e.stock, 1)
            localStorage.setItem('carrito', JSON.stringify(cart))
        })
    })
}
