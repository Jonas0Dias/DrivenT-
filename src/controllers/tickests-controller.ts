import { AuthenticatedRequest } from '@/middlewares';
import { Response } from 'express';
import httpStatus from 'http-status';
import ticketsService from '@/services/tickets-service';

export async function findAll(req: AuthenticatedRequest, res: Response) {

    try {
      const ticketsList = await ticketsService.findAll();
  
      return res.status(httpStatus.OK).send(ticketsList);
    } catch (error) {
      return res.sendStatus(httpStatus.NO_CONTENT);
    }
  }