require('dotenv/config');
require('express-async-errors');
const express = require('express');
const cors = require('cors');
const UserRoutes = require('../routers/login.route');
const ProductsRoutes = require('../routers/products.route');
const OrdersRoutes = require('../routers/orders.route');

const errorMiddleware = require('../middlewares/error.middleware');
const validateToken = require('../middlewares/validateToken.middleware');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use('/images', express.static(`${__dirname}/public/images`));

app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/user', UserRoutes);
app.use('/products', ProductsRoutes);
app.use('/orders', validateToken, OrdersRoutes);
app.use(errorMiddleware);

module.exports = app;
