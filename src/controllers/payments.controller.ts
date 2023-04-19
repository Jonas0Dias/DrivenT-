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


  export async function postPayment(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const { ticketId, cardData } = req.body;
  
    try {
      if (!ticketId || !cardData) return res.sendStatus(httpStatus.BAD_REQUEST);
  
      const payment = await paymentsService.postPayment(ticketId, userId, cardData);
      if (!payment) return res.sendStatus(httpStatus.NOT_FOUND);
  
      return res.status(httpStatus.OK).send(payment);
    } catch (error) {
      if (error.name === 'UnauthorizedError') {
        return res.sendStatus(httpStatus.UNAUTHORIZED);
      }
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }