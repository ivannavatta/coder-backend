window.addEventListener('DOMContentLoaded', async () => {
    try {
        let cartId;
        const response = await fetch('/users/user-cart');
        const data = await response.json();
        cartId = data.payload;
        console.log('cid', cartId);

        const res = await fetch(`/api/payments/payment-intents/${cartId}`, {
            method: 'POST'
        });

        const dataa = await res.json();
        console.log("🚀 ~ button1.addEventListener ~ data:", dataa)
        if (dataa.payload) {
            const clientSecret = dataa.payload;
            document.getElementById('clientSecretInput').value = clientSecret;

        } else {
            console.error('Client secret not found');
        }

    } catch (error) {
        console.error(error);
    }
});
