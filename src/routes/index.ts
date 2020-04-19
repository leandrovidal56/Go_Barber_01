import { Router } from 'express';
import appointmentsRouter from './appointmentsroutes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);

export default routes;
