const chai = require('chai')
const supertest = require('supertest');



const expect = chai.expect
const requester = supertest('http://localhost:3001');

let cookie

describe('Testing avanzado', () => {
   
        describe('Testing sessions', () => {
            it("El endpoint POST /auth debe verficar si el usario se autentico correctamente", async () => {
                //role admin
                // const userMock = {
                //     email: "boss@gmail.com",
                //     password: "boss"
                // }
                //role user
                const userMock = {
                    email: "user@gmail.com",
                    password: "user"
                }
    
                const response = await requester
                    .post("/auth")
                    .send(userMock)
    
                // Almacenar las cookies de sesión
                cookieResult = response.headers['set-cookie'][0]
                console.log('cookieResult:', cookieResult);
                cookie = {
                    name: cookieResult.split('=')[0],
                    value: cookieResult.split('=')[1]
                }
                console.log('cookie:', cookie);
                console.log("Autenticación:", response.statusCode, response.ok, response._body)
    
                expect(response.statusCode).to.equal(200);
                expect(response.ok).to.be.ok;
                
            })

            xit('Corroborar que la infromacion de usario del metodo GET /current sea igual a la que se guardo en la cookie', async function(){
                const {statusCode, ok, _body} = await requester.get('/current').set("Cookie", `${cookie.name}=${cookie.value}`)
                console.log("🚀 ~ it ~ _body:", _body)
                console.log("🚀 ~ it ~ ok:", ok)
                console.log("🚀 ~ it ~ statusCode:", statusCode)

               expect(_body.payload.email).to.be.eql('boss@gmail.com')
            })

            xit('al registrarse un usario debe devolver un status 201 si se hizo correctamente, tambien verificar que el email no exista al momento de crear el usario', async function(){
                const userMock = {
                    first_name: 'user',
                    last_name: 'user',
                    email: 'user@gmail.com',
                    password: 'user'
                }
                const response = await requester.get('/users')
                const users = response._body.payload
                let emailExist = false
                for (let i = 0; i < users.length; i++) {
                    if(users[i].email === userMock.email){
                        emailExist = true
                        break;
                    }
                    
                }
                expect(emailExist).to.be.false

                const {statusCode, ok, _body} = await requester.post('/users').send(userMock)
                console.log("🚀 ~ it ~ _body:", _body)
                console.log("🚀 ~ it ~ ok:", ok)
                console.log("🚀 ~ it ~ statusCode:", statusCode)
                expect(statusCode).to.be.eql(201)

                
                
            })

        })
        describe('Testing de products', () => {
            
            const productMock = {
                name: 'producto prueba',
                description: 'esto es un test',
                price: 1,
                thumbnail: 'www.google.com',
                stock: 1
            };
            xit('el metodo POST debe crear el producto correctamente', async function(){
            const { statusCode, ok, _body } = await requester
                .post('/products')
                .set("Cookie", `${cookie.name}=${cookie.value}`)
                .send(productMock);
    
            console.log("🚀 ~ it ~ body:", _body);
            console.log("🚀 ~ it ~ ok:", ok);
            console.log("🚀 ~ it ~ statusCode:", statusCode);
            expect(_body).to.have.property('payload').that.is.an('object');
            expect(_body.payload).to.have.property('_id')
        });
    
            xit('El método PUT debe poder actualizar correctamente a un producto', async function() {
               
            const existingProduct = '6637caea4483308371f83afa'
            
            const updateProduct = {
                name: 'producto prueba 4',
                description: 'esto es un test',
                price: 4,
                thumbnail: 'www.google.com',
                stock: 4
            }
    
           
            const { statusCode, ok, _body } = await requester.put(`/products/${existingProduct}`).set("Cookie", `${cookie.name}=${cookie.value}`).send(updateProduct)
            console.log("🚀 ~ it ~ _body:", _body)
            console.log("🚀 ~ it ~ ok:", ok)
            console.log("🚀 ~ it ~ statusCode:", statusCode)
    
            expect(statusCode).to.equal(200)
        
        })

        xit('Al obtener a los productos con el método GET, la respuesta debe tener los campos status y payload. Además, payload debe ser de tipo arreglo.', async function() {
           

            const { statusCode, ok, _body } = await requester.get('/products/json').set("Cookie", `${cookie.name}=${cookie.value}`)
            console.log("🚀 ~ it ~ _body:", _body)
            console.log("🚀 ~ it ~ ok:", ok)
            console.log("🚀 ~ it ~ statusCode:", statusCode)

            expect(_body).to.have.property('status')
            expect(_body).to.have.property('payload').that.is.an('array');
        })

        })

        describe('Testing carts', () => {
            xit('Verifica que la solicitud devuelva un código de estado 200, tambien verifica que la respuesta contenga una propiedad payload con una lista de carritos, en el metodo GET /carts', async function(){
                
                const { statusCode, ok, _body } = await requester.get('/carts')
                console.log("🚀 ~ it ~ _body:", _body)
                console.log("🚀 ~ it ~ ok:", ok)
                console.log("🚀 ~ it ~ statusCode:", statusCode)
                expect(statusCode).to.be.eql(200)
                expect(_body).to.have.property('payload')
            })

            xit('Verifica que todos los productos hayan sido eliminados del carrito correctamente en el metodo DELETE /carts/:cid (crear un nuevo carrito, agregar productos al mismo y por ultimo eliminar los productos).', async function(){
                const product = {productid: '6637caea4483308371f83afa' }
                

                const postResponse = await requester.post(`/carts`)
                console.log('postResponse:', postResponse.statusCode, postResponse.ok, postResponse._body);
                expect(postResponse.statusCode).to.be.eql(201)

                const cid = postResponse._body.payload._id

                const patchResponse = await requester.patch(`/carts/${cid}`).send(product).set("Cookie", `${cookie.name}=${cookie.value}`)
                console.log('patchResponse:', patchResponse.statusCode, patchResponse.ok, patchResponse._body);
                expect(patchResponse.statusCode).to.be.eql(200);
                expect(patchResponse.ok).to.be.true;

                const { statusCode, ok, _body } = await requester.delete(`/carts/${cid}`)
                console.log("🚀 ~ it ~ _body:", _body)
                console.log("🚀 ~ it ~ ok:", ok)
                console.log("🚀 ~ it ~ statusCode:", statusCode)
                expect(postResponse._body.payload).to.have.property('products').that.is.an('array').that.is.empty
                
            })

            it()
        
        })
    
});
