const socket = io();

const form = document.getElementById('product')
const productNew = document.getElementById('productNew')
const productList = document.getElementById('productList')

form.addEventListener('submit', e => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const code = document.getElementById("code").value;
    const price = document.getElementById("price").value;
    const stock = document.getElementById("stock").value;
    const category = document.getElementById("category").value;
    const thumbnail = document.getElementById("thumbnails").value;
    const productComplete = { title, description, code, price, stock, category, thumbnail}
    socket.emit('message', productComplete)
})

socket.on('product', data => {
    productNew.innerHTML =`
    <table style="border: black 1px solid;">
        <tr>
            <th style="border: black 1px solid;">Producto agregado</th>
        </tr>
        <tr>
            <td>Titulo: ${data.title}</td>
        </tr>
        <tr>
            <td>Descripcion: ${data.description}</td>
        </tr>
        <tr>
            <td>Codigo: ${data.code}</td>
        </tr>
        <tr>
            <td>Precio: ${data.price}</td>
        </tr>
        <tr>
            <td>Stock: ${data.stock}</td>
        </tr>
        <tr>
            <td>Categoria: ${data.category}</td>
        </tr>
        <tr>
            <td>Imagenes: ${data.thumbnail}</td>
        </tr>
    </table>
    `;

    const productNewList = document.createElement("li");
    productNewList.innerText = `${data.title}: ${data.price}`;
    productList.prepend(productNewList);
})
