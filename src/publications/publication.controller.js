'use strict';

import {
    createPostRecord,
    getAllPosts,
    getPostsByUser,
    updatePostById,
    deletePostById
} from './publication.service.js';


export const createPost = async (req, res) => {
    try {
        const post = await createPostRecord({
            postData: {
                ...req.body,
                authorId: req.user.id
            }
        });

        res.status(201).json({
            success: true,
            message: 'Publicación creada!',
            data: post
        });

    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};


export const getPosts = async (req, res, next) => {
    try {
        const posts = await getAllPosts();

        res.status(200).json({
            success: true,
            data: posts
        });
    } catch (err) {
        next(err);
    }
};


export const getMyPosts = async (req, res, next) => {
    try {
        const posts = await getPostsByUser(req.user.id);

        res.status(200).json({
            success: true,
            data: posts
        });
    } catch (err) {
        next(err);
    }
};


export const updatePost = async (req, res, next) => {
    try {
        const updated = await updatePostById({
            postId: req.params.id,
            userId: req.user.id,
            updateData: req.body
        });

        res.status(200).json({
            success: true,
            message: 'Publicación actualizada.',
            data: updated
        });
    } catch (err) {
        next(err);
    }
};


export const deletePost = async (req, res, next) => {
    try {
        await deletePostById({
            postId: req.params.id,
            userId: req.user.id
        });

        res.status(200).json({
            success: true,
            message: 'Publicación eliminada.'
        });
    } catch (err) {
        next(err);
    }
};