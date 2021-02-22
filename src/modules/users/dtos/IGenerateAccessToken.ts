export default interface IGenerateAccessToken {
  config: {
    secret: string;
    expiresIn: string;
  };
  payload: {
    id: string;
    email: string;
  };
}
