import { Enrollment, Ticket, TicketStatus, TicketType } from '@prisma/client';
import ticketRepository from '@/repositories/ticket-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import { notFoundError } from '@/errors';
import { boolean } from 'joi';

async function findAll(): Promise<TicketType[]> {
  return await ticketRepository.findAll();
} //aqui retorna um array com os TicketTypes

async function findTickedByUserId(userId: number): Promise<Ticket> {

  const enrollmentFromUserId = await ticketRepository.getEnrolmentByUserId(userId)
  if (!enrollmentFromUserId) throw notFoundError();
  
  const searchTicket = await ticketRepository.findTickedByUserId(userId);
  if(!searchTicket) throw notFoundError();

  return searchTicket

}

async function postTicket(userId: number, ticketTypeId: number): Promise<Ticket> {

  const enrollmentFromUserId: Enrollment = await ticketRepository.getEnrolmentByUserId(userId)
  if (!enrollmentFromUserId) throw notFoundError();
  
  const status: TicketStatus = 'RESERVED'
  // const searchTicket = await ticketRepository.findTickedByUserId(userId);
  // if(!searchTicket) throw notFoundError();

  const ticket = await ticketRepository.postTicket(ticketTypeId, status, enrollmentFromUserId.id)

  return ticket

}



const ticketsService = {
  findAll,
  findTickedByUserId,
  postTicket
};

export default ticketsService;
