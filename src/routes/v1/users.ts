import { Router } from 'express';

import { list, show, edit, destroy } from 'controllers/users';
import { checkJwt } from 'middleware/checkJwt';
import { checkRole } from 'middleware/checkRole';
import { validatorEdit } from 'middleware/validation/users';

const router = Router();

router.get('/',  list);

router.get('/:userId', [checkJwt], show);

router.patch('/:userId', [checkJwt, checkRole(['ADMINISTRATOR'], true), validatorEdit], edit);

router.delete('/:userId', [checkJwt, checkRole(['ADMINISTRATOR'], true)], destroy);

export default router;