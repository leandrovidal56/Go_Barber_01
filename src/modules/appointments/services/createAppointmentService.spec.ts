import AppError from '@shared/erros/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './createAppointmentService';
import appointmentsRouter from '../infra/htpp/routes/appointmentsroutes';

describe('CreateAppoinment', () => {
  it('sloud be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123123',
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123');
  });

  it('create two appointments in same data', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const AppointmentDate = new Date(2020, 8, 25, 11);
    await createAppointment.execute({
      date: AppointmentDate,
      provider_id: '123123',
    });
    expect(
      createAppointment.execute({
        date: AppointmentDate,
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  // it('not create two appointment is equal hour', () => {});
});
