'use strict';

import { Router } from 'express';
import {
    register,
    login,
    getMyProfile,
    updateProfile
} from './user.controller.js';

import { validateRegister, validateLogin, validateUpdateProfile } from '../../middlewares/user-validator.js';
import { validateJWT } from '../../middlewares/validate-JWT.js';

const router = Router();

router.post(
    '/',
    validateRegister,
    register
);

router.post(
    '/login',
    validateLogin,
    login
);

router.get(
    '/me',
    validateJWT,
    getMyProfile
);

router.put(
    '/me',
    validateJWT,
    validateUpdateProfile,
    updateProfile
);

export default router;
