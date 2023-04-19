import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { findAll, findAllFromUser, postTicket } from '@/controllers/tickests-controller';
import { ticketsSchema } from '@/schemas/tickets-schemas';

const ticketsRouter = Router();

ticketsRouter.all('/*', authenticateToken)
.get('/types', findAll)
.get('/', findAllFromUser)
.post('/', validateBody(ticketsSchema), postTicket)

export { ticketsRouter };
