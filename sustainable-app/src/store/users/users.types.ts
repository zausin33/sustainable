import {Model} from '../store.types';
import {Challenge} from "../challenges/challenges.types";

export interface UsersState {
  current: User | undefined
}

export interface User extends Model {
  username: string;
  email: string;
  challenges: Challenge[]
  token: string;
  role: Role;
}

export enum Role {ROLE_USER, ROLE_ADMIN }
