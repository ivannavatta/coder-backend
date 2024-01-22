

const socket = io()


    const addProductForm = document.getElementById('addProductForm');
    const titleInput = document.getElementById('title');
    const priceInput = document.getElementById('price');
    const descriptionInput = document.getElementById('description');
    const messageLogs = document.getElementById('messageLogs')
  


    addProductForm.addEventListener('submit', (event) => {
        event.preventDefault();
      
        const newProduct = {
          title: titleInput.value,
          price: priceInput.value,
          description: descriptionInput.value,
        };
      
        // Envía el nuevo producto al servidor a través de WebSocket
        socket.emit('addProduct', newProduct);
      
        // Limpiar los campos del formulario después de agregar el producto
        titleInput.value = '';
        priceInput.value = '';
        descriptionInput.value = '';

      


      });
      
   

 

      socket.on('messageProducts', data => {
        let productsHTML = '';
    
        data.forEach(product => {
            productsHTML += `
                <div id="product-list">
                    <p>Name: ${product.title} </p>
                    <p>Price: ${product.price} </p>
                    <p>Description: ${product.description} </p>
                </div>
            `;
        });
    
        messageLogs.innerHTML = productsHTML;
    });
    





