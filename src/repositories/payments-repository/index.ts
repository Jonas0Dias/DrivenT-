import { prisma } from '@/config';
import { Payment } from '@prisma/client';


async function findPaymentByTicketId(ticketId: number) {
    return prisma.payment.findFirst({
      where: {
        ticketId,
      },
    });
  }

//   async function createPayment(ticketId: number, params: Payment) {
//     return prisma.payment.create({
//       data: {
//         ticketId,
//         ...params,
//       },
//     });
//   }


  export default { findPaymentByTicketId,  };