import { TicketType } from '@prisma/client';
import ticketTypeRepository from '@/repositories/ticket-repository';




async function findAll(): Promise<TicketType[]> {
    return await ticketTypeRepository.findAll();
  } //aqui retorna um array com os TicketTypes



  const ticketsService = {
   findAll,
  };
  
  export default ticketsService;
  