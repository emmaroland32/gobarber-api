import { Router } from 'express';

import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordsRouter from '@modules/users/infra/http/routes/passwords.routes';
import profilesRouter from '@modules/users/infra/http/routes/profiles.routes';
import providersRouter from '@modules/appointments/infra/http/routes/providers.routes';
import transactionRouter from '@modules/transactions/infra/http/routes/credit.routes';
const routes = Router();

export const commonRoute = '/api/v1';

routes.use(`${commonRoute}/appointments`, appointmentsRouter);
routes.use(`${commonRoute}/providers`, providersRouter);
routes.use(`${commonRoute}/users`, usersRouter);
routes.use(`${commonRoute}/sessions`, sessionsRouter);
routes.use(`${commonRoute}/password`, passwordsRouter);
routes.use(`${commonRoute}/profile`, profilesRouter);
routes.use(`${commonRoute}/transaction`, transactionRouter);
export default routes;
