import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import RecipientsController from './app/controllers/RecipientController';
import CouriersController from './app/controllers/CourierController';
import OrderController from './app/controllers/OrderController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/users', UserController.store);
routes.put('/users/:id', UserController.update);

routes.post('/recipient', RecipientsController.store);
routes.put('/recipient/:id', RecipientsController.update);

routes.post('/couriers', CouriersController.store);
routes.get('/couriers', CouriersController.index);
routes.put('/couriers/:id', CouriersController.update);
routes.delete('/couriers/:id', CouriersController.delete);

routes.post('/orders', OrderController.store);
routes.get('/orders', OrderController.index);
routes.put('/orders/:id', OrderController.update);
routes.delete('/orders/;id', OrderController.delete);

export default routes;
