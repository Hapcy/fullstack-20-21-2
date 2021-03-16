import {
  Collection,
  Entity,
  Enum,
  ManyToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Label } from './label';

@Entity()
export class Issue {
  @PrimaryKey()
  id!: number;

  @Property()
  description!: string;

  @Property()
  title!: string;

  @Property()
  place!: string;

  @Enum()
  status: IssueStatus = IssueStatus.New;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  modifiedAt: Date = new Date();

  @ManyToMany(() => Label, 'issues', { owner: true })
  labels = new Collection<Label>(this);
}

export enum IssueStatus {
  New = 'NEW',
  Doing = 'DOING',
  Done = 'DONE',
}
