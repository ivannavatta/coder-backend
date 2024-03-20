const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', e => {
  e.preventDefault()
  console.log('logout')
   fetch('/auth/logout', {redirect: 'follow'})
     .then(response => {
       if (response.redirected) {
         window.location.href = response.url;
       } else {
         console.error('Error al destruir la sesión:', response.statusText);
       }
     })
     .catch(error => {
       console.log(error);
     });
 });
 
