const { Router } = require('express')

const router = Router()

router.get('/', (req, res) => {
    res.json({ carts });
});

//  create a new cart
router.post('/', (req, res) => {
    const newCart = {
        id: carts.length + 1, 
        products: [],
    };

    carts.push(newCart);
    res.json({ status: 'success', cart: newCart });
});

// filtro de carrito por id
router.get('/:cid', (req, res) => {
    const { cid } = req.params;
    const cart = carts.find(cart => cart.id == cid);

    if (!cart) 
        return res.status(404).json({ error: 'Cart not found' });

        res.json({ cart });
});

//  agregar un producto al carrito por ID
router.post('/:cid/product/:pid', (req, res) => {
    const { cid } = req.params;
    const { pid } = req.params;
    const cart = carts.find(cart => cart.id == cid);

    if (!cart) {
        res.status(404).json({ error: 'Cart not found' });
    } else {
        const existingProduct = cart.products.find(p => p.product.id == pid);

        if (existingProduct) {
            // Si el producto ya existe, incrementa la cantidad
            existingProduct.quantity += 1;
        } else {
            // Si el producto no existe, agrégalo al carrito
            const newProduct = {
                product: { id: pid },
                quantity: 1,
            };
            cart.products.push(newProduct);
        }

        res.json({ status: 'success', cart });
    }
     
       
    
});

module.exports = router