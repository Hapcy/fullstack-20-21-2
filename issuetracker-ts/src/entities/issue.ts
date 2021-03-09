import { Entity, Enum, PrimaryKey, Property } from '@mikro-orm/core';

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
}

export enum IssueStatus {
  New = 'NEW',
  Doing = 'DOING',
  Done = 'DONE',
}
