declare namespace Express {
  export interface Request {
    user: {
      id: string;
      token: string;
      firstname: string;
      lastname: string;
      phonenumber: string;
      username: string;
      othername: string;
      title: string;
      email: string;
      role: string;
    };
  }
}
