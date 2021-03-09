import { Router } from 'express';
import { issueRouter } from './issue-controller';

export const router = Router();

router.use('/issues', issueRouter);
