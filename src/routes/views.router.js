import { Router } from "express";
import ProductManager from "../ProductManager.js";
import { writeFileSync } from 'fs'

const router = Router();

// Crear nueva instancia de la clase
const productManager = new ProductManager('./database/products.json')
const products = productManager.getProducts();

router.get('/',(req, res) => {
    res.render('home', {products})
})

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', {products})
})

//Agrega un producto
router.post('/realtimeproducts', (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnails} = req.body;
    const id = products.length + 1;
    const product = { id, title, description, code, price: parseFloat(price), status: Boolean(status), stock: parseInt(stock), category, thumbnails}
    products.unshift(product);
    writeFileSync('./database/products.json',JSON.stringify(products, null, '\t'))
    res.render('realTimeProducts', {products})
    console.log(product);
})

export default router;