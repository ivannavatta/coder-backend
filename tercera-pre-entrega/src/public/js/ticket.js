const button1 = document.getElementById('hola')

let cid;

// Obtener el cid cuando se carga la página
window.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/users/user-cart');
        const data = await response.json();
        cid = data.payload;
        console.log('cid', cid);
    } catch (error) {
        console.error(error);
    }
});

button1.addEventListener('click', async () => {
    try {
    
        const res = await fetch(`/carts/${cid}/purchase`,{
            method: 'POST'
        })

        if (res.ok) {
            if (res.redirected) {
                window.location.href = res.url;
            } else {
                return res.json();
            }
            // Aquí puedes redirigir al usuario a la página del ticket o mostrar un mensaje de éxito
        }  if (data.redirect) {
            window.location.href = data.redirect;
        } else {
            console.log(data);
        }
        
    } catch (error) {
        console.log(error);
    }
})