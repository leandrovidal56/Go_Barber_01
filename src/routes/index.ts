import { Router } from 'express';
import appointmentsRouter from './appointmentsroutes';
import usersRouter from './usersroutes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);

export default routes;
