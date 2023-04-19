import paymentsRepository from "@/repositories/payments-repository";
import { Payment } from "@prisma/client";
import { notFoundError, unauthorizedError } from '@/errors';
import { CardPaymentParams, PaymentParams } from '@/protocols';


import ticketRepository from "@/repositories/ticket-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";

async function findPaymentByTicketId(ticketId: number, userId: number): Promise<Payment> {


    const ticket = await ticketRepository.findTickeyById(ticketId);
     if (!ticket) throw notFoundError();
   
     const enrollment = await enrollmentRepository.findById(ticket.enrollmentId);

  if (enrollment.userId !== userId) throw unauthorizedError();


    return await paymentsRepository.findPaymentByTicketId(ticketId);
  } 

  async function postPayment(ticketId: number, userId: number, cardData: CardPaymentParams) {
   
  
    const ticket = await ticketRepository.findTicketWithTypeById(ticketId);
    if (!ticket) throw notFoundError();

  const enrollment = await enrollmentRepository.findById(ticket.enrollmentId);
  if (!enrollment) throw notFoundError();

  if (enrollment.userId !== userId) throw unauthorizedError();
  
    const paymentData: PaymentParams = {
      ticketId,
      value: ticket.TicketType.price,
      cardIssuer: cardData.issuer,
      cardLastDigits: cardData.number.toString().slice(-4),
    };
  
    const payment = await paymentsRepository.createPayment(ticketId, paymentData);
  
    await ticketRepository.ticketProcessPayment(ticketId);
  
    return payment;
  }



  const paymentsService = {
    findPaymentByTicketId,
    postPayment,
  };
  
  export default paymentsService;