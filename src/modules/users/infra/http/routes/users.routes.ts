import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import multer from 'multer';
import uploadConfig from '@config/upload';

import UsersController from '@modules/users/infra/http/controllers/UsersController';
import UserAvatarController from '@modules/users/infra/http/controllers/UserAvatarController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const upload = multer(uploadConfig.multer);

usersRouter.post(
  '/register',
  celebrate({
    [Segments.BODY]: {
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      title: Joi.string(),
      username: Joi.string(),
      email: Joi.string().email().required(),
      othername: Joi.string(),
      phonenumber: Joi.string().required(),
      pin: Joi.string().length(4).required(),
      confirmPin: Joi.string().valid(Joi.ref('pin')),
      password: Joi.string().min(8).required(),
      confirmPassword: Joi.string()
        .length(Joi.ref('password'))
        .valid(Joi.ref('password')),
      role: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.post(
  '/update',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      user: Joi.object(),
      firstname: Joi.string(),
      lastname: Joi.string(),
      title: Joi.string(),
      username: Joi.string(),
      email: Joi.string().email(),
      othername: Joi.string(),
      phonenumber: Joi.string(),
      pin: Joi.string().length(4),
      newPin: Joi.string().length(4),
      confirmPin: Joi.string()
        .length(Joi.ref('newPin'))
        .valid(Joi.ref('newPin')),
      password: Joi.string().min(8),
      newPassword: Joi.string().min(8),
      confirmPassword: Joi.string()
        .length(Joi.ref('newPassword'))
        .valid(Joi.ref('newPassword')),
      role: Joi.string(),
    },
  }),
  usersController.update,
);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
