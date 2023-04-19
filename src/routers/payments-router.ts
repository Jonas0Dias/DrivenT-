import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { } from '@/controllers';

const paymentsRouter: Router = Router();

paymentsRouter.all('/*', authenticateToken)
.get('/',)
.post('/process', );

export { paymentsRouter };