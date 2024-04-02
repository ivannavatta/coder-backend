const button1 = document.getElementById('buyButton')

button1.addEventListener('click', async () => {
    try {
        const cid = window.location.pathname.split('/')[2];
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