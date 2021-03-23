import { wrap } from '@mikro-orm/core';
import { Router } from 'express';
import { Issue } from '../entities/issue';
import { User, UserRole } from '../entities/user';
import { authorize } from '../security/authorize';

export const issueRouter = Router();

issueRouter
  .use((req, res, next) => {
    req.issueRepository = req.orm.em.getRepository(Issue);
    next();
  })
  .get('', async (req, res) => {
    let issues: Issue[];
    if (req.user!.role === UserRole.Admin) {
      issues = await req.issueRepository!.findAll({ populate: ['user'] });
    } else {
      issues = await req.issueRepository!.find({
        user: {
          id: req.user!.id,
        },
      });
    }
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

    issue.user = req.orm.em.getReference(User, req.user!.id);

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
  .delete('/:id', authorize(UserRole.Admin), async (req, res) => {
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
