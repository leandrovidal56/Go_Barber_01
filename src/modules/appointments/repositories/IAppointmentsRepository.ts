import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IcreateAppoitmentDTO from '../dtos/IcreateAppointmentDTO';

export default interface IAppointmentsRepository {
  create(data: IcreateAppoitmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}
