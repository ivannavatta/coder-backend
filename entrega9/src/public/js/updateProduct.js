const formUpdated = document.getElementById('form-update-product')
const errorMessage = document.getElementById('error-message');

errorMessage.style.display = 'none';

formUpdated.addEventListener('submit', async e => {
    try {
        e.preventDefault()

        const productId = document.getElementById('ProductUpdatedId').value
        console.log('id', productId);

        const info = new FormData(formUpdated)
    
        const obj = {}

        info.forEach((value, key) => (obj[key] = value))

        console.log('obj:', obj);
       const res = await fetch(`/products/${productId}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        })

        const data = await res.json()
        
        if(res.ok){
            
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "success",
                title: `Updated Product `
              });
        }
        else {
            errorMessage.textContent = 'Product not found or is not active';
            errorMessage.style.display = 'block'; 
        }
        
        
       
    } catch (err) {
        console.log(err)
    }
   
});