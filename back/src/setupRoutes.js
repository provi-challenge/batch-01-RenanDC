import Router from 'express-promise-router';
import { Courses } from './Courses.js';
import { Customer } from './Customer.js';
import { Financing } from './Financing.js';
import { Payment } from './Payment.js';

const router = Router();

const sendOk = (res, data) =>
  res.json({
    error: false,
    status: 'OK',
    data,
  });

const sendData = (res, data) => sendOk(res, data);

export const setupRoutes = app => {
  app.use(router);
  router.get('/', async (req, res) => {
    return res.json({ error: false, status: 'OK' });
  });
  router.get('/courses', async (req, res) => {
    return sendData(res, await Courses.get());
  });
  router.get('/courses/:id', async (req, res) => {
    const { params } = req;
    return sendData(res, await Courses.get(params.id));
  });
  router.get('/customer', async (req, res) => {
    return sendData(res, await Customer.get());
  });
  router.post('/customer', async (req, res) => {
    const { body } = req;
    return sendData(res, await Customer.post(body));
  });
  router.put('/customer', async (req, res) => {
    const { body } = req;
    return sendData(res, await Customer.put(body));
  });
  router.get('/financing/:input_value', async (req, res) => {
    const { params } = req;
    return sendData(res, await Financing.getFinancing(params.input_value));
  });
  router.get('/payments', async (req, res) => {
    return sendData(res, await Payment.get());
  });
};
