'use strict';

import { Router } from 'express';
import {
    createComment,
    getPostComments,
    updateComment,
    deleteComment
} from './comment.controller.js';

import { validateJWT } from '../../middlewares/validate-JWT.js';

const router = Router();

router.get(
    '/post/:postId', 
    getPostComments
);

router.post(
    '/post/:postId', 
    validateJWT, 
    createComment
);

router.put(
    '/:id', 
    validateJWT, 
    updateComment
);

router.delete(
    '/:id', 
    validateJWT, 
    deleteComment
);

export default router;