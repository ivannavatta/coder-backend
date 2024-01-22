class ProductManager{
    constructor() {
        this.products = [];
        this.id = 1

    }

    getProducts() {
        return this.products
    }

    addProduct(title, description, price, code, stock, thumbnail) {
        if (!title || !price || !description || !thumbnail || !code || !stock) {
            console.error('Todos los datos son requeridos');
            return;
        }
        const productExist = this.products.find(product =>  product.code === code)
        if(productExist) return console.log(`el producto con ${code} ya existe `);
        const products = {
            id: this.id++,
            title,
            description,
            price,
            code,
            stock,
            thumbnail,
        }
        this.products.push(products);

    }

    getProductByid(id) {
        const idExist = this.products.find(p => p.id === id)
        if(!idExist){
          return  console.log('not found');
        }
     return idExist
    }
}

const productManager = new ProductManager()
console.log(productManager.getProducts()); 
productManager.addProduct('Placa de video', 'la mejor grafica de todo el mercado', 2000, 'rtx 4090 msi', 4, 'https://app.contabilium.com/files/explorer/20302/Productos-Servicios/concepto-11445886.png')
productManager.addProduct('Motherboard', 'la mejor mother de todo el mercado', 2000, 'z390 asus', 11, 'https://dlcdnwebimgs.asus.com/gain/5A82F507-4F6D-4526-A088-ECEF3357DAEA')
console.log(productManager.getProducts()); 
console.log(productManager.getProductByid(1)); 
console.log(productManager.getProductByid(2)); 
console.log(productManager.getProductByid(3)); 
