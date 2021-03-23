import express from 'express';
import bodyParser from 'body-parser';
import { router } from './controllers';
import { mikroorm } from './entities';
import mikroOrmConfig from './mikro-orm.config';
import { passport } from './security/passport';

const app = express();

app.use(bodyParser.json());

app.use(passport.initialize());

app.use(mikroorm(mikroOrmConfig));

app.use(router);

export { app };
