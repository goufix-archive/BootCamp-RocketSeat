import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlansController from './app/controllers/PlanController';
import RegistrationController from './app/controllers/RegistrationController';
import AnswerOrderController from './app/controllers/AnswerOrderController';
import StudentQuestionController from './app/controllers/StudentQuestionController';

import authMiddleware from './app/middlewares/auth';
import CheckinController from './app/controllers/CheckinController';

const routes = new Router();

// TODO Organizar ordens das rotas e importações também a ordem das funções dentro dos Controllers

// CHECKIN
routes.post('/students/:student_id/checkins', CheckinController.store);
routes.get('/students/:student_id/checkins', CheckinController.index);

// USER
routes.post('/user', UserController.store);

// SESSION
routes.post('/sessions', SessionController.store);

// HELP ORDERS
routes.post(
  '/students/:student_id/help-orders',
  StudentQuestionController.store
);
routes.get(
  '/students/:student_id/help-orders',
  StudentQuestionController.index
);

routes.use(authMiddleware);

// STUDENTS
routes.get('/students', StudentController.index);
routes.post('/students', StudentController.store);
routes.put('/students/:student_id', StudentController.update);
routes.put('/user', UserController.update);

// PLANS
routes.post('/plans', PlansController.store);
routes.get('/plans', PlansController.index);
routes.get('/plans/:plan_id', PlansController.show);
routes.put('/plans/:plan_id', PlansController.update);
routes.delete('/plans/:plan_id', PlansController.delete);

// REGISTRATION
routes.post('/registration', RegistrationController.store);
routes.get('/registration/', RegistrationController.index);
routes.put('/registration/:registration_id', RegistrationController.update);
routes.delete('/registration/:registration_id', RegistrationController.delete);

// HELP ORDERS
routes.post('/help-orders/:question_id/answer', AnswerOrderController.store);
routes.get('/help-orders/pending', AnswerOrderController.index);

export default routes;
