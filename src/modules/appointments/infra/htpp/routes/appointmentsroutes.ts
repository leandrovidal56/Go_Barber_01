import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import EnsureAuthenticated from '@modules/users/infra/htpp/middlewares/ensureAuthenticated';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/createAppointmentService';

const appointmentsRouter = Router();
appointmentsRouter.use(EnsureAuthenticated);
// appointmentsRouter.get('/', async (request, response) => {
//   console.log(request.user);
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const appointmentsRepository = new AppointmentsRepository();

  const parsedDate = startOfHour(parseISO(date));
  const createAppointment = new CreateAppointmentService(
    appointmentsRepository,
  );

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
