const fs =  require ('fs');
const loggerFactory = require('../../factory/logger.factory');

class ProductDao {
    constructor(){
        this.path = './files/products.json'
        this.getAll();
    }

    getAll = async () => {

        if(fs.existsSync(this.path)){
            const data = await fs.promises.readFile(this.path,'utf-8')
            const productos = JSON.parse(data);
           
             
             this.product = productos;

            return productos
        } else{
            return [];
        }
    }

    create = async (newProduct) => {


        const productos = await this.getAll();
        if(productos.length === 0){
            newProduct.id = 1
        } else {
            newProduct.id = productos[productos.length-1].id + 1;
        }

        productos.push(newProduct);
        await fs.promises.writeFile(this.path,JSON.stringify(productos,null,'\t'))
        return productos

    }

    updated = async (id, updated) => {

        const productos = await this.getAll();

        const index = productos.findIndex(producto => producto.id === id);

        if (index === -1) {
            console.error('Producto no encontrado');
            return null;
        }

        const updatedProduct = { ...productos[index], ...updated };
        productos[index] = updatedProduct;

        await fs.promises.writeFile(this.path, JSON.stringify(productos, null, '\t'));

        return updatedProduct;
    }

    delated = async (id) => {

        const productos = await this.getAll();

        const index = productos.findIndex(producto => producto.id === id);

        if (index === -1) {
            console.error('Producto no encontrado');
            return null;
        }

        const deletedProduct = productos.splice(index, 1)[0];

        await fs.promises.writeFile(this.path, JSON.stringify(productos, null, '\t'));

        return deletedProduct;
    }
    getProducts() {
        return this.product;
    }


    findById(id) {
        return new Promise((resolve, reject) => {
            loggerFactory.debug('ID recibido:', Number(id));
            loggerFactory.debug('Lista de productos:', this.product);
            const product = this.product.find(product => product.id === Number(id));
            if (product) {
                resolve(product);
            } else {
                reject(new Error(`el producto con el id ${id} no existe`));
            }
        });
    }
    
    
  }

  module.exports = ProductDao