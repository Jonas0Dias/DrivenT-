import paymentsRepository from "@/repositories/payments-repository";
import { Payment } from "@prisma/client";
import { notFoundError, unauthorizedError } from '@/errors';

import ticketRepository from "@/repositories/ticket-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";

async function findPaymentByTicketId(ticketId: number, userId: number): Promise<Payment> {


    const ticket = await ticketRepository.findTickeyById(ticketId);
     if (!ticket) throw notFoundError();
   
     const enrollment = await enrollmentRepository.findById(ticket.enrollmentId);

  if (enrollment.userId !== userId) throw unauthorizedError();


    return await paymentsRepository.findPaymentByTicketId(ticketId);
  } //aqui retorna um array com os TicketTypes
  


  const paymentsService = {
    findPaymentByTicketId
  };
  
  export default paymentsService;