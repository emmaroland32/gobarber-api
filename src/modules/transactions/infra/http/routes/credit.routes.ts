import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import TransactionController from '../controllers/TransactionController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const transactionRouter = Router();
const transactionController = new TransactionController();

transactionRouter.use(ensureAuthenticated);

transactionRouter.post(
  '/cash',
  celebrate({
    [Segments.BODY]: {
      type: Joi.string().required(),
      amount: Joi.number().required(),
      date: Joi.date(),
    },
  }),
  transactionController.create,
);

export default transactionRouter;
