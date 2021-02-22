export default interface ICreatePaymentDTO {
  user_id: string;
  poster_id: string;
  customer_id: string;
  amount: number;
  email: string;
  date: Date;
}
