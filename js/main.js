
fetch('data.json')
    .then(res => res.json())
    .then(data => {
        // Hacemos Fetch con los productos que queremos mostrar en el index
        generadorCardsDestacadas(data.productos, tituloCards1, cardsDestacadas, 1, 11, 1, 4, 19, "Productos Destacados")

        generadorCardsDestacadas(data.productos, tituloCards2, cardsCombos, 2, 25, 27, 20, 23, "Combos Destacados")

        generadorCardsDestacadas(data.productos, tituloCards3, cardsOfertas, 1, 13, 15, 14, 12, "Mejores Ofertas")
    })

// funcion de Validacion del carrito
const validarStorageCarrito = () => {

    //Guardo el parseo del carrito en una variable
    const validarStoragecart = JSON.parse(localStorage.getItem('carrito'))

    //retornamos la variable, y en caso que tenga valor null vamos a retornar el array vacio, sino el parseo del carrito
    return validarStoragecart == null ? [] : JSON.parse(localStorage.getItem('carrito'))
}

// Ejecutamos validacion sobre la variable
let cart = validarStorageCarrito()

// funcion para Buscar un prodcuto en el Array - 
const isInCart = (id) => cart.find(product => product.id === id)

// funcion para Mostrar la cantidad de todos los productos en el HTML
const acumuladorCantidad = () => {

    // utilizamos un reduce para acumular todas las cantidades de los productos
    const cantTotal = cart.reduce((cantidad, product) => cantidad + product.cant, 0)

    // Guardamos la cantidad total en Local Storage
    localStorage.setItem('acumularCantidadTotal', JSON.stringify(cantTotal))

    // Mostramos en el HTML
    document.getElementById("cnt").innerHTML = cantTotal
}

// Ejecutamos Funcion
acumuladorCantidad()

// funcion para agregar producto al carrito
const addItem = (category, name, id, precio, imgP, stock, quantity) => {

    // funcion isinCart va a buscar en el Array cart si ya se encuentra el productob en el Array
    // esta funcion devuelve un booleano TRUE || FALSE
    if (isInCart(id)) {
        // en caso de ser TRUE definimos el producto seleccionado en el Array
        let findCart = cart.find(producto => producto.id == id)

        // Hacemos la Validacion para que el usuario no pueda sobrepasar el Stock del producto
        if (findCart.cant < stock) {

            // vamos sumando la cantidad de cada Producto
            findCart.cant = findCart.cant + quantity

            // ejecutamos la biblioteca Toastify
            Toastify({
                text: `Sumaste ${name} al carrito`,
                duration: 2000,
                destination: "carrito.html",
                newWindow: true,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(313deg, #ffc107, #e13b11, #00000080, #000000)",
                },
                onClick: function () { } // Callback after click
            }).showToast();
        }

        // una vez seleccionado y validado el producto, hacemos un Spread Operator para pushear el producto al Array
        cart = [...cart]

        // Vamos Actualizando la Cantidad de los productos totales para mostrarlas en el HTML
        acumuladorCantidad()
    }
    else {

        // ejecutamos la biblioteca Toastify
        Toastify({
            text: `Agregaste ${name} al carrito`,
            duration: 2000,
            destination: "carrito.html",
            newWindow: true,
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(313deg, #0dcaf0, #0842988a, #00000080, #000000)"
            },
            onClick: function () { } // Callback after click
        }).showToast();

        // en caso que el producto no se Encuentre en el Carrito
        // vamos a definir una variable para que me devuelva el Stock del producto
        const stockActualizado = JSON.parse(localStorage.getItem(`storageEnStock${id}`)) || stock

        // usamos Spread Operator para pushear el nuevo producto al Array
        cart = [...cart, { category: category, name: name, id: id, precio: precio, imgP: imgP, stock: stockActualizado, cant: quantity }]
        acumuladorCantidad()
    }
}

// variables con las id's de las distintas cards que vamos a mostrar
const tituloCards1 = document.getElementById("titleDestacado")
const tituloCards2 = document.getElementById("titleCombos")
const tituloCards3 = document.getElementById("titleOfertas")
const cardsDestacadas = document.getElementById("cardsDestacados")
const cardsCombos = document.getElementById("cardsCombos")
const cardsOfertas = document.getElementById("cardsOfertas")

// Unica funcion para traer los productos que queremos + sus titulos
function generadorCardsDestacadas(producto, titulo, cardProducto, clase, p1, p2, p3, p4, tituloCards) {

    // tenemos los distintos titulos que queremos mostrar
    // titulo es el parametro que selecciona la ID en el HTML
    // tituloCards es el parametro que muestra el Titulo de dicho ID que fue seleccionado en el titulo
    titulo.innerHTML = `<th class="title-h">            
    <h1 class="title-card">${tituloCards}</h1>
    </th>`

    // cardProducto es el parametro que contiene las Cards y sus elementos a continuacion
    // dejamos el innerHTML vacio para podes acumular todas las cards
    cardProducto.innerHTML = '';

    // variable donde seleccionamos los productos que queremos mostrar en el HTML
    // utilizamos los parametros para poder seleccionar distintos productos para cada Cards
    const seleccion = [producto[p1], producto[p2], producto[p3], producto[p4]]

    // traemos todos los productos para utilizar sus propiedades
    seleccion.forEach(product => {
        // creamos variable para crear HTML, creamos elemento las clases y el innerHTML con la Card
        let card = document.createElement('td')
        card.className = "prdt-1 card-product"
        card.innerHTML = `<div class="fond-card${clase}">
        <img class="img-p" src="img/productos/${product.img}" alt=${product.img}>
        <span class="stock" id="segunStock">stock</span>
        <span class="fav-start fa fa-star"></span>
        <div class="col-md-subCard">
        <p class="name-prod">${product.nombre}</p>
        <span class="price-prod">$${product.precio}</span>
        <button class="btn-cart btn-outline-dark" id="btnBuy${product.id}">
        Add to Cart
        </button>
        </div>
        </div>`
        // usamos appendChild para que dicho parametro para que pueda guardar distintas cards que fuimos seleccionando
        cardProducto.appendChild(card)
    })

    // utilizamos forEach para utilizar las propiedades de los productos
    seleccion.forEach(product => {

        // seleccionamos la id del boton que fue seleccionado por el usuario
        const buyBtn = document.getElementById(`btnBuy${[product.id]}`);

        buyBtn.addEventListener('click', function () {

            // usamos la funcion addItem para guarda el producto
            addItem(product.categoria, product.nombre, product.id, product.precio, product.img, product.stock, 1)

            // seteamos en el local Storage
            localStorage.setItem('carrito', JSON.stringify(cart))
        })
    })
}


