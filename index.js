import express from 'express';
import bodyParser from 'body-parser';
import { USERS, ORDERS } from './db.js';
import { authorizationMiddleware } from './middlewares.js';

const app = express();

app.use(bodyParser.json());

/**
 * POST -- create resource
 * req -> input data
 * res -> output data
 */
app.post('/users', (req, res) => {
 const { body } = req;

 console.log(`body`, JSON.stringify(body));

 const isUserExist = USERS.some(el => el.login === body.login);
 if (isUserExist) {
  return res.status(400).send({ message: `user with login ${body.login} already exists` });
 }

 USERS.push(body);

 res.status(200).send({ message: 'User was created' });
});

app.get('/users', (req, res) => {
 const users = USERS.map(user => {
  const { password, ...other } = user;
  return other;
 });
 return res
  .status(200)
  .send(users);
});

//task1
const addAddress = (newAddress) => {
  if (!addresses.includes(newAddress)) {
    addresses.push(newAddress);
    if (addresses.length > 5) {
      addresses.shift();
    }
  }
};

app.get('/addresses', (req, res) => {
  res.json(addresses);
});

app.post('/orders', (req, res) => {
  const { from } = req.body;
  if (from) {
    addAddress(from);
    res.status(201).json({ message: 'Address added successfully' });
  } else {
    res.status(400).json({ error: 'Address is required' });
  }
});


//task 2
app.post('/login', (req, res) => {
 const { body } = req;

 const user = USERS
  .find(el => el.login === body.login && el.password === body.password);

 if (!user) {
  return res.status(400).send({ message: 'User was not found' });
 }

 const token = randomUUID();

 user.token = token;
 USERS.save(user.login, { token });

 return res.status(200).send({
  token,
  message: 'User was login'
 });
});

const addToAddress = (newAddress) => {
  if (!toAddresses.includes(newAddress)) {
    toAddresses.push(newAddress);
    if (toAddresses.length > 3) {
      toAddresses.shift();
    }
  }
};

app.get('/to-addresses', (req, res) => {
  res.json(toAddresses);
});

app.post('/orders', (req, res) => {
  const { to } = req.body;
  if (to) {
    addToAddress(to);
    res.status(201).json({ message: 'Address added successfully' });
  } else {
    res.status(400).json({ error: 'Address is required' });
  }
});

//task4
const generateRandomPrice = () => {
  return Math.floor(Math.random() * (100 - 20 + 1)) + 20;
};

app.post('/orders', (req, res) => {
  const { to, userToken } = req.body;
  const user = users[userToken];
  if (!user) {
    return res.status(400).json({ error: `User was not found by token: ${userToken}` });
  }
  if (to) {
    addToAddress(to);
    const newOrder = {
      userId: user.id,
      to: to,
      price: generateRandomPrice(),
    };
    orders.push(newOrder);
    res.status(201).json(newOrder);
  } else {
    res.status(400).json({ error: 'Address is required' });
  }
});

app.get('/lowest-order', (req, res) => {
  const userToken = req.query.userToken;
  const user = users[userToken];
  if (!user) {
    return res.status(400).json({ error: `User was not found by token: ${userToken}` });
  }
  const userOrders = orders.filter(order => order.userId === user.id);
  if (userOrders.length === 0) {
    return res.status(404).json({ message: 'User do not have orders yet' });
  }
  const lowestOrder = userOrders.reduce((minOrder, currentOrder) => {
    return currentOrder.price < minOrder.price ? currentOrder : minOrder;
  }, userOrders[0]);
  res.json(lowestOrder);
});

//task5
app.get('/biggest-order', (req, res) => {
  const userToken = req.query.userToken;
  const user = users[userToken];
  if (!user) {
    return res.status(400).json({ error: `User was not found by token: ${userToken}` });
  }
  const userOrders = orders.filter(order => order.userId === user.id);
  if (userOrders.length === 0) {
    return res.status(404).json({ message: 'User do not have orders yet' });
  }
  const biggestOrder = userOrders.reduce((maxOrder, currentOrder) => {
    return currentOrder.price > maxOrder.price ? currentOrder : maxOrder;
  }, userOrders[0]);
  res.json(biggestOrder);
});


app.post('/orders', authorizationMiddleware, (req, res) => {
 const { body, user } = req;

 const order = {
  ...body,
  login: user.login
 };

 ORDERS.push(order);

 return res.status(200).send({ message: 'Order was created', order });
});

app.get('/orders', authorizationMiddleware, (req, res) => {
 const { user } = req;

 const orders = ORDERS.filter(el => el.login === user.login);

 return res.status(200).send(orders);
});

app.listen(8080, () => console.log('Server was started'));