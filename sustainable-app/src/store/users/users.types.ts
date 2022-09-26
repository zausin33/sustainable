import {Model, Status} from '../store.types';

export interface UsersState extends Status {
  current: User | undefined
}

export interface User extends Model {
  username: string;
  email: string;
  challenges: string[]
  token: string;
  role: Role;
}

export enum Role {ROLE_USER, ROLE_ADMIN }
