import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import authConfig from '@config/auth';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import AuthenticateTokenService from '@modules/users/services/AuthenticateTokenService';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const config = authConfig.jwt;
    const { email, password } = req.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, access_token } = await authenticateUser.execute({
      email,
      password,
      config,
    });

    return res.json({
      user: classToClass(user),
      access_token,
    });
  }

  public async me(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;
    const access_token = req.user.token;
    const { user } = await container
      .resolve(AuthenticateTokenService)
      .execute({ id: userId });

    return res.status(200).json({
      user: classToClass(user),
      access_token,
    });
  }
}
