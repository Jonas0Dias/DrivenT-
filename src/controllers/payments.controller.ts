import { AuthenticatedRequest } from '@/middlewares';
import { Response } from 'express';
import httpStatus from 'http-status';
import paymentsService from '@/services/payments-service';


export async function findPaymentByTicketId(req: AuthenticatedRequest, res: Response) {
    
    try {
        const  ticketId = Number(req.query.ticketId)
        const userId  = req.userId
   
        if (!ticketId) return res.sendStatus(httpStatus.BAD_REQUEST);

 
 const paymentFromTicketId = await paymentsService.findPaymentByTicketId(ticketId, userId);

 
 if (!paymentFromTicketId) return res.sendStatus(httpStatus.NOT_FOUND);

 return res.status(httpStatus.OK).send(paymentFromTicketId);
    } catch (error) {
      return res.sendStatus(httpStatus.NO_CONTENT);
    }
  }