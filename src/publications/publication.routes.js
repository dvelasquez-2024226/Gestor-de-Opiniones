'use strict';

import { Router } from 'express';
import {
    createPost,
    getPosts,
    getMyPosts,
    updatePost,
    deletePost
} from './publication.controller.js';

import { validateJWT } from '../../middlewares/validate-JWT.js';

const router = Router();


router.get('/', getPosts);

router.get(
    '/mine', 
    validateJWT, 
    getMyPosts
);

router.post(
    '/', 
    validateJWT, 
    createPost
);

router.put(
    '/id', 
    validateJWT, 
    updatePost
);

router.delete(
    '/id', 
    validateJWT, 
    deletePost
);

export default router;
