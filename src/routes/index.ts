import { Router } from 'express';
import appointmentsRouter from './appointmentsroutes';
import usersRouter from './usersroutes';
import sessionsRouter from './sessionsroutes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
