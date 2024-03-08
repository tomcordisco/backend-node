const express=require("express");
const ProductManager = require("./productManager");
const productManager = new ProductManager();
const PORT = 4000;
const app = express();

// Primer metodo
app.get("/", (req, res) => {
    res.send("Server básico con Express...!!!");
});

app.get("/hola", (req, res) => {
    res.send("hola");
});

//Método para consultar por un producto, utilizando su id
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;

    //Todo lo que me ingrese desde el cliente va a ser un string, entonces lo tenemos que convertir a número con parseInt
    const product = await productManager.getProductById(parseInt(id));
    if (product) {
        res.send(product)
    } else {
        res.send("Producto no existente")
    }
})

//Método para ver mis productos y con un límite de resultados gracias a req.query
//Poner esto en la ruta: localhost:4000/products/?limit=1
app.get("/products/", async (req, res) => {
    const products = await productManager.getProducts();
    const limit = req.query.limit;

    //Aplicar el límite si se proporciona, sino mostrar todos los productos
    if (limit) {
        const limitedProducts = products.slice(0, parseInt(limit));
        res.send({ products: limitedProducts });
    } else {
        res.send({ products });
    }
})

//Inicializo el servidor
try {
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
} catch (error) {
    console.error("Error al intentar iniciar el servidor:", error);
}