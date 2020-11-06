import { Router } from 'express';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import authMiddleware from './app/middleware/auth';
import DeliverymanController from './app/controllers/DeliverymanController';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

routes.get('/deliverymans', DeliverymanController.index);
routes.post('/deliverymans', DeliverymanController.store);
// routes.put('/deliverymans/:id', DeliverymanController.update);
// routes.delete('/deliverymans/:id', DeliverymanController.delete);

export default routes;
