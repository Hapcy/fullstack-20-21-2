import { wrap } from '@mikro-orm/core';
import { Router } from 'express';
import { Issue } from '../entities/issue';

export const issueRouter = Router();

issueRouter
  .get('', async (req, res) => {
    const issueRepository = req.orm.em.getRepository(Issue);
    const issues = await issueRepository.findAll();
    res.send(issues);
  })
  .post('', async (req, res) => {
    const issueRepository = req.orm.em.getRepository(Issue);

    const issue = new Issue();

    const wrappedIssue = wrap(issue);

    wrappedIssue.assign(req.body);

    await issueRepository.persistAndFlush(issue);

    res.send(issue);
  })
  .get('/:id', () => {});
