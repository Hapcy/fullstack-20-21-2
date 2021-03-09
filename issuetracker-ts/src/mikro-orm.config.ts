import { IDatabaseDriver, Configuration, Options } from '@mikro-orm/core';
import { Issue } from './entities/issue';

export default {
  entities: [Issue],
  dbName: 'issuetracker',
  type: 'sqlite',
} as Options<IDatabaseDriver> | Configuration<IDatabaseDriver>;
