import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import EnsureAuthenticated from '@modules/users/infra/htpp/middlewares/ensureAuthenticated';
import AppointmentsRepository from '@modules/appointments/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/createAppointmentService';

const appointmentsRouter = Router();
appointmentsRouter.use(EnsureAuthenticated);
appointmentsRouter.get('/', async (request, response) => {
  console.log(request.user);
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const createAppointment = new CreateAppointmentService();

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });

  return response.json(appointment);
});

export default appointmentsRouter;