export default interface ICreateUserDTO {
  username: string;
  email: string;
  password: string;
  title?: string;
  firstname: string;
  lastname: string;
  othername?: string;
  phonenumber: string;
  pin: string;
  avatar?: string;
  role: 'admin' | 'staff' | 'user';
  data: {};
}
