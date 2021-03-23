import { Router } from 'express';
import { passport } from '../security/passport';
import { issueRouter } from './issue-controller';
import { userRouter } from './user-controller';

export const router = Router();

router.use(
  '/issues',
  passport.authenticate('jwt', { session: false }),
  issueRouter,
);
router.use('/users', userRouter);
