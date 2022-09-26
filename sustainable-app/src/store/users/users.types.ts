import {Model} from '../store.types';

export interface UsersState {
  current: User | undefined
}

export interface User extends Model {
  username: string;
  email: string;
  challenges: string[]
  token: string;
  role: Role;
}

export interface Challenge extends Model {

}

export enum Role {ROLE_USER, ROLE_ADMIN }
