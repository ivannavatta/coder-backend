const form = document.getElementById('form-add-product')

form.addEventListener('submit', async e => {
    try {
        e.preventDefault()

        const info = new FormData(form)
    
        const obj = {}
    
        info.forEach((value, key) => (obj[key] = value))
        console.log('obj:', obj);
       const res = await fetch('/products', {
            method: "POST",
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
                title: `Create Product `
              });
        }
        
    } catch (err) {
        console.log(err)
    }
   
});
