import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';

import ICreditsRepository from '@modules/transactions/repositories/ICreditsRepository';
import CreditsRepository from '@modules/transactions/infra/typeorm/repositories/CreditsRepository';

import IDebitsRepository from '@modules/transactions/repositories/IDebitsRepository';
import DebitsRepository from '@modules/transactions/infra/typeorm/repositories/DebitsRepository';

import ITransactionsRepository from '@modules/transactions/repositories/ITransactionsRepository';
import TransactionsRepository from '@modules/transactions/infra/typeorm/repositories/TransactionsRepository';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository,
);

container.registerSingleton<ICreditsRepository>(
  'CreditsRepository',
  CreditsRepository,
);

container.registerSingleton<IDebitsRepository>(
  'DebitsRepository',
  DebitsRepository,
);

container.registerSingleton<ITransactionsRepository>(
  'TransactionsRepository',
  TransactionsRepository,
);
