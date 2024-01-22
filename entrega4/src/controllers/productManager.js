const fs =  require ('fs')



 class ProductManager {
    constructor(){
        this.path = './files/products.json'
        this.consultarProductos();
    }

    consultarProductos = async () => {

        if(fs.existsSync(this.path)){
            const data = await fs.promises.readFile(this.path,'utf-8')
            const productos = JSON.parse(data);
           
             
             this.product = productos;

            return productos
        } else{
            return [];
        }
    }

    addProducto = async (producto) => {


        const productos = await this.consultarProductos();
        if(productos.length === 0){
            producto.id = 1
        } else {
            producto.id = productos[productos.length-1].id + 1;
        }

        productos.push(producto);
        await fs.promises.writeFile(this.path,JSON.stringify(productos,null,'\t'))
        return productos

    }

    updateProduct = async (productId, updatedData) => {

        const productos = await this.consultarProductos();

        const index = productos.findIndex(producto => producto.id === productId);

        if (index === -1) {
            console.error('Producto no encontrado');
            return null;
        }

        const updatedProduct = { ...productos[index], ...updatedData };
        productos[index] = updatedProduct;

        await fs.promises.writeFile(this.path, JSON.stringify(productos, null, '\t'));

        return updatedProduct;
    }

    deleteProduct = async (productId) => {

        const productos = await this.consultarProductos();

        const index = productos.findIndex(producto => producto.id === productId);

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


    getProductById(id) {
        return new Promise((resolve, reject) => {
            console.log('ID recibido:', Number(id));
            console.log('Lista de productos:', this.product);
            const product = this.product.find(product => product.id === Number(id));
            if (product) {
                resolve(product);
            } else {
                reject(new Error(`el producto con el id ${id} no existe`));
            }
        });
    }
    
    
  }

  module.exports = ProductManager