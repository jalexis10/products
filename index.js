require('dotenv').config();
const express = require('express');
const path = require('path');
const debug = require('debug')('app');
const morgan = require('morgan');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME || 'My App';
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public/')));
app.set('views', './src/views');
app.set('view engine', 'ejs');
    
app.get('/products', (req, res) => {
    const products = require('./src/views/products.json');
  
        const productsWithStock = products.map(product => {
      const stockValue = product.product_price * product.product_quantity;
      return { ...product, stockValue };
    });
  
    res.render('products', { products: productsWithStock });
  });

  


app.listen(PORT, () => {
    console.log(`${APP_NAME} is running on http://localhost:${PORT}`);
});
