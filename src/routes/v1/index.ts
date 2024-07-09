import { Router } from 'express';

import auth from './auth';
import users from './users';
import organizations from './organization';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/organizations', organizations);

export default router;
