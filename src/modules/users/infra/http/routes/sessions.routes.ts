import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import { Request, Response } from 'express';

import SessionsController from '@modules/users/infra/http/controllers/SessionsController';
import { commonRoute } from '@shared/infra/http/routes';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.get(
  '/',
  async (_: Request, res: Response): Promise<Response> => {
    return res.status(200).json({
      message: `Session Api ready on ${commonRoute}/sessions`,
    });
  },
);

sessionsRouter.post(
  '/login',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.create,
);

sessionsRouter.get('/access-token', ensureAuthenticated, sessionsController.me);

export default sessionsRouter;
