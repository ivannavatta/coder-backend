let cartId;

// Obtener el cid cuando se carga la página
window.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/users/user-cart');
        const data = await response.json();
        cartId = data.payload;
        console.log('cid', cartId);
    } catch (error) {
        console.error(error);
    }
});

const buttonCart = document.querySelectorAll('.add-to-cart')

buttonCart.forEach(function(button){
    button.addEventListener('click', async function() {
        const pid = this.dataset.pid; // Obtener el ID del producto desde el atributo de datos
        if (!cartId) {
            console.error('No se ha obtenido el ID del carrito.');
            return;
        }
        try { 
            
            const response = await fetch(`/carts/${cartId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ productid: pid })
            });

            if (response.ok) {
                // Actualizar la interfaz de usuario aquí según sea necesario
                // Por ejemplo, puedes mostrar un mensaje de éxito o actualizar la cantidad de productos en el carrito
                console.log('Producto agregado al carrito correctamente');
            } else {
                console.error('Error al agregar el producto al carrito:', response.statusText);
            }
            
        } catch (error) {
            console.error(error);
        }
    });
});

const trashIcons = document.querySelectorAll('.trashIcon');

trashIcons.forEach(function(trashIcon) {
    trashIcon.addEventListener('click', async function () {
        const pid = this.dataset.pid;
        console.log('pid', pid);
        const res = await fetch(`/carts/${cartId}/products/${pid}`, {
            method: 'DELETE'
        });
        const data = await res.json();
        if(res.ok){
            this.parentElement.remove();
        }
        
        console.log(data);
    });
});
