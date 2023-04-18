import { Enrollment, Ticket } from '@prisma/client';
import { prisma } from '@/config';

async function create(data: any) {
  return prisma.session.create({
    data,
  });
}

async function findAll() {
  return prisma.ticketType.findMany();
}

async function findTickedByUserId(userId: number): Promise<Ticket> {
  return prisma.ticket.findFirst({
    where: {
      Enrollment: {
        userId,
      },
    },
    include: {
      TicketType: true,
    },
  });
}

const ticketRepository = {
  create,
  findAll,
  findTickedByUserId,
};

export default ticketRepository;
