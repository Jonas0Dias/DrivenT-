import { Enrollment, Ticket, TicketStatus, TicketType } from '@prisma/client';
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

async function getEnrolmentByUserId(userId: number): Promise<Enrollment> {
  return await prisma.enrollment.findFirst({
    where: { userId },
  });
}

async function postTicket(ticketTypeId: number, status: TicketStatus, enrollmentId: number): Promise<Ticket & { TicketType: TicketType }> {
  return await prisma.ticket.create({
    data: {
      ticketTypeId,
      enrollmentId,
      status,
    },
    include: {
      TicketType: true,
    },
  });
}

async function findTickeyById(ticketId: number): Promise<Ticket> {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      Enrollment: true,
    },
  });
}

async function findTicketWithTypeById(ticketId: number): Promise<Ticket & { TicketType: TicketType }> {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      TicketType: true,
    },
  });
}

async function ticketProcessPayment(ticketId: number): Promise<Ticket> {
  return prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: TicketStatus.PAID,
    },
  });
}

const ticketRepository = {
  create,
  findAll,
  findTickedByUserId,
  getEnrolmentByUserId,
  postTicket,
  findTickeyById,
  findTicketWithTypeById,
  ticketProcessPayment
};



export default ticketRepository;
