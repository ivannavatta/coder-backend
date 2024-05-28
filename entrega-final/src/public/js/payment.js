const button1 = document.getElementById('buyButton');


button1.addEventListener('click', async () => {
    const cid = window.location.pathname.split('/')[2];
        window.location.href = `/carts/${cid}/check-stock`
});




