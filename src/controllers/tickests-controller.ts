import { Response } from 'express';
import httpStatus from 'http-status';
import { Ticket } from '@prisma/client';
import { AuthenticatedRequest } from '@/middlewares';
import ticketsService from '@/services/tickets-service';

export async function findAll(req: AuthenticatedRequest, res: Response) {
  console.log('teste');
  console.log(req);
  try {
    const ticketsList = await ticketsService.findAll();

    return res.status(httpStatus.OK).send(ticketsList);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function findAllFromUser(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const ticket: Ticket = await ticketsService.findTickedByUserId(userId);

    return res.status(httpStatus.OK).send(ticket);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}
