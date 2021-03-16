import { IDatabaseDriver, Configuration, Options } from '@mikro-orm/core';
import { Issue } from './entities/issue';
import { Label } from './entities/label';

export default {
  entities: [Issue, Label],
  dbName: 'issuetracker',
  type: 'sqlite',
} as Options<IDatabaseDriver> | Configuration<IDatabaseDriver>;
