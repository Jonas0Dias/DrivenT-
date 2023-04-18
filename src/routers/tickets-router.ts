import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { findAll } from '@/controllers/tickests-controller';

const ticketsRouter = Router();

ticketsRouter.all('/*', authenticateToken).get('/types', findAll);
// .get('/', () => {})
// .post('/', () => {})

export { ticketsRouter };
