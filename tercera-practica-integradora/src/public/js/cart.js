document.addEventListener('DOMContentLoaded', async () => {
    const cart = document.getElementById('cart'); 

    cart.addEventListener('click', async e => { 
        e.preventDefault(); 

        try {
            const res = await fetch('/users/user-cart');
            const data = await res.json();
            const cid = data.payload;

            if (!cid) {
                console.log('El usuario no tiene un carrito');
                window.location.href = '/login'; 
                return;
            }

            window.location.href = `/carts/${cid}`; 
        } catch (error) {
            console.log(error);
        }
    });
});
