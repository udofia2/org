import { Router } from 'express';

import { createOrganization, show, inviteToOrganization, list } from 'controllers/organizations';
import { checkJwt } from 'middleware/checkJwt';
import { validatorCreateOrganization } from 'middleware/validation/organizations';
import { validatorInviteToOrganization } from 'middleware/validation/organizations/validateInvite';

const router = Router();

router.post('/', [checkJwt, validatorCreateOrganization], createOrganization).get('/', [checkJwt], list);

router.get('/:organizationId', [checkJwt], show);
router.post('/:organizationId/users', [checkJwt, validatorInviteToOrganization], inviteToOrganization);

export default router;
