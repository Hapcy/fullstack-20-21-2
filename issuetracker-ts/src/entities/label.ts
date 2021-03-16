import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Issue } from './issue';

@Entity()
export class Label {
  @PrimaryKey()
  id!: number;

  @Property()
  text!: string;

  @ManyToMany(() => Issue, 'labels')
  issues = new Collection<Issue>(this);
}
