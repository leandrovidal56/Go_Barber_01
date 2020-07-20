import { Router } from 'express';
import sessionsRouter from '@modules/users/infra/htpp/routes/sessionsroutes';
import appointmentsRouter from '@modules/appointments/infra/htpp/routes/appointmentsroutes';
import usersRouter from '@modules/users/infra/htpp/routes/usersroutes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
