import { prisma } from '@/config';

async function create(data: any) {
  return prisma.session.create({
    data,
  });
}

async function findAll() {
  return prisma.ticketType.findMany();
}

const ticketTypeRepository = {
  create,
  findAll,
};

export default ticketTypeRepository;
