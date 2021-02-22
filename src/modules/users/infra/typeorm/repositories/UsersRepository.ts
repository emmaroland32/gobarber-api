import { getRepository, Repository, Not } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICraeteUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

import User from '@modules/users/infra/typeorm/entities/User';
import IGenerateAccessToken from '@modules/users/dtos/IGenerateAccessToken';
import { sign } from 'jsonwebtoken';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async generateAccessToken({
    payload,
    config,
  }: IGenerateAccessToken): Promise<string> {
    const access_token = sign(payload, config.secret, {
      subject: payload.id,
      expiresIn: config.expiresIn,
    });
    return access_token;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });

    return user;
  }

  public async findAllProviders({
    execept_user_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    let users: User[];

    if (execept_user_id) {
      users = await this.ormRepository.find({
        where: {
          id: Not(execept_user_id),
        },
      });
    } else {
      users = await this.ormRepository.find();
    }

    return users;
  }

  public async create({
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
  }: ICraeteUserDTO): Promise<User> {
    const user = this.ormRepository.create({
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

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public capitalize(str: string): string | undefined {
    // converting first letter to uppercase
    return str.replace(/^./, str[0].toUpperCase());
  }
}

export default UsersRepository;
