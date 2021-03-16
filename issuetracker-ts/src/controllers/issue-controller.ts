import { wrap } from '@mikro-orm/core';
import { Router } from 'express';
import { Issue } from '../entities/issue';

export const issueRouter = Router();

issueRouter
  .use((req, res, next) => {
    req.issueRepository = req.orm.em.getRepository(Issue);
    next();
  })
  .get('', async (req, res) => {
    const issues = await req.issueRepository!.findAll();
    res.send(issues);
  })
  .post('', async (req, res) => {
    const issue = new Issue();

    const wrappedIssue = wrap(issue);

    wrappedIssue.assign(req.body, { em: req.orm.em });

    for (const label of issue.labels) {
      if (label.id) {
        req.orm.em.merge(label);
      }
    }

    await req.issueRepository!.persistAndFlush(issue);

    res.send(issue);
  })
  .get('/:id', async (req, res) => {
    const issue = await req.issueRepository!.findOne({ id: req.params.id }, [
      'labels',
    ]);
    if (!issue) {
      res.sendStatus(404);
    }
    res.send(issue);
  })
  .delete('/:id', async (req, res) => {
    await req.issueRepository!.nativeDelete({
      id: req.params.id,
    });
    res.sendStatus(200);
  })
  .put('/:id', async (req, res) => {
    const issue = await req.issueRepository!.findOne({ id: req.params.id }, [
      'labels',
    ]);
    if (!issue) {
      res.sendStatus(404);
    }

    const wrappedIssue = wrap(issue);

    wrappedIssue.assign(req.body, { em: req.orm.em });

    await req.issueRepository!.persistAndFlush(issue);

    res.send(issue);
  });
