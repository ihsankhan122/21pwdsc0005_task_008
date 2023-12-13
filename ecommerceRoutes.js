const express = require('express');
const router = express.Router(); // Use express.Router() instead of express()

// Middleware for logging
const loggerMiddleware = (req, res, next) => {
  console.log(`[${new Date().toUTCString()}] ${req.method} ${req.url}`);
  next();
};

// Middleware for authentication
const authenticateUser = (req, res, next) => {
  const isLoggedIn = true; // Simulated authentication
  if (isLoggedIn) {
    next();
  } else {
    res.status(401).send('Unauthorized. Please log in.');
  }
};

// Middleware for parsing incoming requests
router.use(express.urlencoded({ extended: true })); // Use router.use() instead of app.use()
router.use(express.json());
router.use(loggerMiddleware);

// Simulated Database 
const products = [
  { id: 1, name: 'Product 1', price: 25 },
  { id: 2, name: 'Product 2', price: 30 },
  { id: 3, name: 'Product 3', price: 40 }
];

// Routes
router.get('/products', (req, res) => {
  res.json(products);
});

router.post('/cart/add/:productId', authenticateUser, (req, res) => {
  const productId = parseInt(req.params.productId);
  const selectedProduct = products.find(product => product.id === productId);
  if (selectedProduct) {
    res.send(`Added ${selectedProduct.name} to the cart.`);
  } else {
    res.status(404).send('Product not found.');
  }
});

router.get('/products/:id', (req, res) => {
  const productId = req.params.id;
  const product = products.find((p) => p.id === parseInt(productId));
  if (!product) {
    res.status(404).send('Product not found');
    return;
  }
  res.json(product);
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Simulated login logic (In reality, validate user credentials)
  if (username === 'user' && bcrypt.compareSync(password, hashedPasswordFromDatabase)) {
    res.send('Login successful!');
  } else {
    res.status(401).send('Invalid credentials.');
  }
});

module.exports = router;
