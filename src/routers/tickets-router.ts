import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { findAll, findAllFromUser } from '@/controllers/tickests-controller';

const ticketsRouter = Router();

ticketsRouter.all('/*', authenticateToken).get('/types', findAll).get('/', findAllFromUser);
// .post('/', () => {})

export { ticketsRouter };
