document.addEventListener('DOMContentLoaded', async () => {
    let cartId;
    const response = await fetch('/users/user-cart');
    const data = await response.json();
    cartId = data.payload;
    console.log('cid', cartId);
    
    const stripe = Stripe('pk_test_51PJKfF09PY8JuRT2PZba88h7yYuF6bYM3PmiuIrpKDLiZ6JPxuo3Jvc71F6lL3GTNP3YCTuDRKRYSuNO3e6IMqv800DmsTRU3w'); // Reemplaza con tu clave pública de Stripe
    const elements = stripe.elements();

    const style = {
        base: {
            color: '#32325d',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
                color: '#aab7c4'
            }
        },
        invalid: {
            color: '#fa755a',
            iconColor: '#fa755a'
        }
    };

    const card = elements.create('card', { style: style });
    card.mount('#card-element');

    card.on('change', ({error}) => {
        const displayError = document.getElementById('card-errors');
        if (error) {
            displayError.textContent = error.message;
        } else {
            displayError.textContent = '';
        }
    });

    const form = document.getElementById('payment-form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const clientSecret = document.getElementById('clientSecretInput').value;

        const {paymentIntent, error} = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: 'Nombre del cliente' // Puedes obtener esto del formulario
                }
            }
        });

        if (error) {
            const displayError = document.getElementById('card-errors');
            displayError.textContent = error.message;
        } else {
            if (paymentIntent.status === 'succeeded') {
                console.log('Payment succeeded!');

                try {
                
                    const res = await fetch(`/carts/${cartId}/purchase`, {
                        method: 'POST'
                    });
    
                    if (res.ok) {
                      const data = await res.json()
                      window.location.href = data.redirect
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
    });
});