import express from 'express';
import bodyParser from 'body-parser';
import { router } from './controllers';
import { mikroorm } from './entities';
import mikroOrmConfig from './mikro-orm.config';

const app = express();

app.use(bodyParser.json());

app.use(mikroorm(mikroOrmConfig));

app.use(router);

app.listen(3000, () => {
  console.log('Server started.');
});
