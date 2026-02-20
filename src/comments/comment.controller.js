'use strict';

import {
    createCommentRecord,
    getCommentsByPost,
    updateCommentById,
    deleteCommentById
} from './comment.service.js';


export const createComment = async (req, res) => {
    try {
        const comment = await createCommentRecord({
            commentData: {
                content: req.body.content,
                postId: req.params.postId,
                authorId: req.user.id
            }
        });

        res.status(201).json({
            success: true,
            message: 'Comentario creado!',
            data: comment
        });

    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};


export const getPostComments = async (req, res, next) => {
    try {
        const comments = await getCommentsByPost(req.params.postId);

        res.status(200).json({
            success: true,
            data: comments
        });
    } catch (err) {
        next(err);
    }
};


export const updateComment = async (req, res, next) => {
    try {
        const updated = await updateCommentById({
            commentId: req.params.id,
            userId: req.user.id,
            updateData: req.body
        });

        res.status(200).json({
            success: true,
            message: 'Comentario actualizado.',
            data: updated
        });
    } catch (err) {
        next(err);
    }
};


export const deleteComment = async (req, res, next) => {
    try {
        await deleteCommentById({
            commentId: req.params.id,
            userId: req.user.id
        });

        res.status(200).json({
            success: true,
            message: 'Comentario eliminado.'
        });
    } catch (err) {
        next(err);
    }
};