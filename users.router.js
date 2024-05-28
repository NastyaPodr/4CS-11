import express from 'express';
import crypto from 'crypto';
import { USERS } from './db.js';

const router = express.Router();

const SUPER_PASSWORD = 'your_super_password'; // Replace this with your actual super password

/**
 * POST -- create resource
 * req -> input data
 * res -> output data
 */
router.post('/users', (req, res) => {
  const { body } = req;

  console.log(`body`, JSON.stringify(body));

  const isUserExist = USERS.some(el => el.login === body.login);
  if (isUserExist) {
    return res.status(400).send({ message: `user with login ${body.login} already exists` });
  }

  const newUser = { ...body, role: 'Customer' };
  USERS.push(newUser);

  res.status(200).send({ message: 'User was created' });
});

router.post('/admin', (req, res) => {
  const { authorization } = req.headers;
  const { login, password } = req.body;

  if (authorization !== SUPER_PASSWORD) {
    return res.status(403).send({ message: 'Forbidden' });
  }

  const isUserExist = USERS.some(el => el.login === login);
  if (isUserExist) {
    return res.status(400).send({ message: `user with login ${login} already exists` });
  }

  const newAdmin = { login, password, role: 'Admin' };
  USERS.push(newAdmin);

  res.status(200).send({ message: 'Admin user was created' });
});

router.post('/drivers', (req, res) => {
  const { login, password } = req.body;

  const isUserExist = USERS.some(el => el.login === login);
  if (isUserExist) {
    return res.status(400).send({ message: `user with login ${login} already exists` });
  }

  const newDriver = { login, password, role: 'Driver' };
  USERS.push(newDriver);

  res.status(200).send({ message: 'Driver user was created' });
});

router.get('/users', (req, res) => {
  const users = USERS.map(user => {
    const { password, ...other } = user;
    return other;
  });
  return res.status(200).send(users);
});

router.post('/login', (req, res) => {
  const { body } = req;

  const user = USERS.find(el => el.login === body.login && el.password === body.password);

  if (!user) {
    return res.status(400).send({ message: 'User was not found' });
  }

  const token = crypto.randomUUID();

  user.token = token;
  USERS.save(user.login, { token });

  return res.status(200).send({
    token,
    message: 'User was login'
  });
});

export default router;