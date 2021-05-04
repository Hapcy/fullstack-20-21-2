import { User } from './user';

export interface Message {
  id: number;
  text: string;
  createdAt: string;
  modifiedAt: string;
  user: User;
}
