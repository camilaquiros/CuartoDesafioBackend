import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import fs from 'fs'
import {Server} from 'socket.io';
import ProductManager from './ProductManager.js';
import viewsRouter from './routes/views.router.js'

// Crear nueva instancia de la clase
const productManager = new ProductManager('./database/products.json');
const products = productManager.getProducts();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname+'/public'))

app.use('/', viewsRouter)

const httpServer = app.listen(8080, ()=> console.log('Escuchando server'));
const io = new Server(httpServer);

io.on('connection', socket => {
    console.log("Cliente conectado");
    socket.on('message', data => {
        const id = products.length + 1;
        const product = { id, ...data}
        products.unshift(product);
        fs.writeFileSync('./database/products.json',JSON.stringify(products, null, '\t'))
        io.emit('product', data)
    })
})

