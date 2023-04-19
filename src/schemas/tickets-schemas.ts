import Joi from 'joi';
import { PostTicket } from '@/protocols';

export const ticketsSchema = Joi.object<PostTicket>({
  ticketTypeId: Joi.number().required(),
});