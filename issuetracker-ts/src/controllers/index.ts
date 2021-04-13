import { Router } from "express";
import { passport } from "../security/passport";
import { issuesRouter } from "./issue-controller";
import { labelsRouter } from "./label-controller";
import { userRouter } from "./user-controller";

export const router = Router();

router.use('/users', userRouter);
router.use('/issues', passport.authenticate('jwt', { session: false }), issuesRouter);
router.use('/labels', passport.authenticate('jwt', { session: false }), labelsRouter);
