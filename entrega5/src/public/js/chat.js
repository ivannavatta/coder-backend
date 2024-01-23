const socket = io()

const chatbox = document.getElementById('chatbox')
const chatContainer = document.getElementById('chatContainer')

const getUser = async () =>{
    try {
        const user = await Swal.fire({
            title: "Enter your name",
            input: 'text',
            showClass: {
              popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `
            },
            hideClass: {
              popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `
            }
          });

          socket.emit('newUser',  user.value)

          socket.on('userConnected', user => {
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
                title: `${user} se conecto`
              });
          })
          

          chatbox.addEventListener('keyup', e => {
            if(e.key == 'Enter'){
                const data = {
                    message: chatbox.value,
                    userName: user.value
                }
                chatbox.value = ''
        
                socket.emit('messages', data)
            }
        })
    } catch (error) {
        console.log(error);
    }
    
}

getUser()



socket.on('messagesLogs', data =>{
    let messages = ''
    data.forEach(chat => ( 
        messages += `${chat.userName}: ${chat.message} <br>`
    ));

    chatContainer.innerHTML = messages
})




