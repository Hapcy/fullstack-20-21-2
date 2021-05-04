import { Label } from './label';
import { Message } from './message';
import { User } from './user';

export interface Issue {
  id: number;
  title: string;
  description: string;
  place: string;
  status: IssueStatus;
  createdAt: string;
  modifiedAt: string;
  labels: Label[];
  user: User;
  messages: Message[];
}

export enum IssueStatus {
  NEW = 'NEW',
  DOING = 'DOING',
  DONE = 'DONE',
}
