import { IDatabaseDriver, Configuration, Options } from '@mikro-orm/core';

export default {
  entities: [],
  dbName: 'issuetracker',
  type: 'sqlite',
} as Options<IDatabaseDriver> | Configuration<IDatabaseDriver>;
