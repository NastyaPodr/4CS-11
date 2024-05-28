import express from 'express';
import bodyParser from 'body-parser';
import { USERS } from './db.js';
import { OrdersRouter } from './routers/index.js';
import UsersRouter from './routers/users.router.js';

const app = express();

app.use(bodyParser.json());

app.use(OrdersRouter);
app.use(UsersRouter);

if (!user) {
  return res.status(400).json({ error: `User was not found by token: ${userToken}` });
}

if (!ADDRESSES.includes(from) || !ADDRESSES.includes(to)) {
  return res.status(400).json({ error: 'Invalid address' });
}

  user.token = token;
  USERS.save(user.login, { token });

  return res.status(200).send({
    token,
    message: 'User was login'
  });

app.listen(8080, () => console.log('Server was started'));