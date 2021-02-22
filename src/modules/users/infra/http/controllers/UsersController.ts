import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      firstname,
      lastname,
      phonenumber,
      pin,
      username,
      othername,
      title,
      email,
      password,
      role,
      avatar,
      data,
    } = req.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      firstname,
      lastname,
      phonenumber,
      pin,
      username,
      othername,
      title,
      email,
      password,
      role,
      avatar,
      data,
    });

    return res.json(classToClass(user));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const {
      username,
      title,
      firstname,
      lastname,
      othername,
      phonenumber,
      pin,
      newPin,
      confirmPin,
      password,
      newPassword,
      confirmPassword,
      role,
      avatar,
    } = req.body.user;

    const updateUser = container.resolve(UpdateUserService);

    const user = await updateUser.execute({
      user_id,
      username,
      title,
      firstname,
      lastname,
      othername,
      phonenumber,
      pin,
      newPin,
      confirmPin,
      password,
      newPassword,
      confirmPassword,
      role,
      avatar,
    });

    return res.json(classToClass(user));
  }
}
