import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import RecipientsController from './app/controllers/RecipientController';
import DeliverymansController from './app/controllers/DeliverymanController';
import FileController from './app/controllers/FileController';

import authMiddleware from './app/middlewares/auth';
import DeliveryController from './app/controllers/DeliveryController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/users', UserController.store);
routes.put('/users/:id', UserController.update);

routes.post('/recipient', RecipientsController.store);
routes.put('/recipient/:id', RecipientsController.update);

routes.post('/deliverymans', DeliverymansController.store);
routes.get('/deliverymans', DeliverymansController.index);
routes.get('/deliverymans/:id', DeliverymansController.show);
routes.put('/deliverymans/:id', DeliverymansController.update);
routes.delete('/deliverymans/:id', DeliverymansController.delete);

routes.post('/delivery', DeliveryController.store);
routes.get('/delivery', DeliveryController.index);
routes.get('/delivery/:id', DeliveryController.show);
routes.put('/delivery/:id', DeliveryController.update);
routes.delete('/delivery/:id', DeliveryController.delete);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
