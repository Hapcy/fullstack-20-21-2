import { IDatabaseDriver, Configuration, Options } from '@mikro-orm/core';
import { Issue } from './entities/issue';
import { Label } from './entities/label';
import { User } from './entities/user';

import { env } from 'process';

export default {
  entities: [Issue, Label, User],
  dbName: env.NODE_ENV === 'test' ? 'issue-tracker.test.sqlite' : 'issue-tracker.sqlite',
  type: 'sqlite',
} as Options<IDatabaseDriver> | Configuration<IDatabaseDriver>;
