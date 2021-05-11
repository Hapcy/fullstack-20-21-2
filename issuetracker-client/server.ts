import * as path from 'path';
import * as express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

app.use(
  '/api',
  createProxyMiddleware({
    target: 'https://fullstack-20-21-2-ts.herokuapp.com',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '',
    },
  })
);

app.use(express.static('./dist/issuetracker-client'));

app.use('*', (req, res) => {
  res.sendFile(path.resolve('./dist/issuetracker-client/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
