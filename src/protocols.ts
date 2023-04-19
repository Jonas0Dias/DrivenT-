import { Ticket, Payment } from "@prisma/client";


export type ApplicationError = {
  name: string;
  message: string;
};

export type ViaCEPAddress = {
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
};

export type AddressEnrollment = {
  logradouro: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  error?: string;
};

export type RequestError = {
  status: number;
  data: object | null;
  statusText: string;
  name: string;
  message: string;
};

export type TicketType = {
  id: number;
  name: string;
  price: string;
  isRemote: boolean;
  includesHotel: boolean;
  createdAt: string;
  updatedAt: string;
};

export type PostTicket = {
  ticketTypeId: number;
};

export type CardPaymentParams = {
  issuer: string;
  number: number;
  name: string;
  expirationDate: Date;
  cvv: number;
};


export type CreateTicketParams = Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>;
export type PaymentParams = Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>;
