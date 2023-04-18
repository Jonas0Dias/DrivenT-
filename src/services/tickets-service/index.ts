import { Ticket, TicketType } from '@prisma/client';
import ticketRepository from '@/repositories/ticket-repository';

async function findAll(): Promise<TicketType[]> {
  return await ticketRepository.findAll();
} //aqui retorna um array com os TicketTypes

async function findTickedByUserId(userId: number): Promise<Ticket> {
  return await ticketRepository.findTickedByUserId(userId);
}

const ticketsService = {
  findAll,
  findTickedByUserId,
};

export default ticketsService;
