const fs = require('fs').promises;
const path = "./src/products.json";

class ProductManager {
    constructor() {}

    async getProducts() {
        try {
            const prods = JSON.parse(await fs.readFile(path, "utf-8"));
            return prods;
        } catch (error) {
            console.error("Error al obtener productos:", error);
            return [];
        }
    }

    async getProductById(id) {
        try {
            const prods = JSON.parse(await fs.readFile(path, "utf-8"));
            const producto = prods.find(prod => prod.id === id);

            if (producto) {
                return producto;
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error al obtener producto por ID:", error);
            return null;
        }
    }

    async addProduct(product) {
        if (
            !product.title ||
            !product.description ||
            !product.price ||
            !product.code ||
            !product.stock ||
            !product.thumbnail
        ) {
            console.log("Todos los campos son obligatorios");
            return;
        }
    
        const prods = JSON.parse(await fs.readFile(path, "utf-8"));
        const prodId = prods.find(prod => prod.id === product.id);
        const prodCode = prods.find(prod => prod.code === product.code);
        
        if (prodId || prodCode) {
            console.log("Ya existe un producto con este id/código");
        } else {
            prods.push(product);
            await fs.writeFile(path, JSON.stringify(prods));
        }
    }

    async updateProduct(id, product) {
        const prods = JSON.parse(await fs.readFile(path, "utf-8"));
        const indice = prods.findIndex(prod => prod.id === id);

        if (indice != -1) {
            prods[indice].title = product.title;
            prods[indice].description = product.description;
            prods[indice].price = product.price;
            prods[indice].code = product.code;
            prods[indice].stock = product.stock;
            prods[indice].thumbnail = product.thumbnail;

            await fs.writeFile(path, JSON.stringify(prods));
        } else {
            console.log("Producto no encontrado");
        }
    }

    async deleteProduct(id) {
        const prods = JSON.parse(await fs.readFile(path, "utf-8"));
        const producto = prods.find(prod => prod.id === id);

        if (producto) {
            await fs.writeFile(path, JSON.stringify(prods.filter(prod => prod.id != id)));
        } else {
            console.log("Producto no encontrado");
        }
    }

}

class Product {
    constructor(title, description, price, code, stock, thumbnail) {
        this.title = title
        this.description = description
        this.price = price
        this.code = code
        this.stock = stock
        this.thumbnail = thumbnail
        this.id = Product.incrementarId()
    }

    static incrementarId() {
        if (this.idIncrement) {
            this.idIncrement++;
        } else {
            this.idIncrement = 1;
        }
        return this.idIncrement
    }
}

const producto1 = new Product("Pantalon mom negro", "producto pantalon", 15, "PROD001", 10, "ejemploImagen1.jpg");
const producto2 = new Product("Pantalon mom jean azul", "producto pantalon", 18, "PROD002", 30, "ejemploImagen2.jpg");


module.exports = ProductManager;