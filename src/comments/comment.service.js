'use strict';

import Comment from './comment.model.js';


export const createCommentRecord = async ({ commentData }) => {
    const comment = new Comment(commentData);
    await comment.save();
    return comment;
};


export const getCommentsByPost = async (postId) => {
    return await Comment.find({ postId }).sort({ createdAt: -1 });
};


export const updateCommentById = async ({ commentId, userId, updateData }) => {
    const comment = await Comment.findById(commentId);

    if (!comment) throw new Error('Comentario no encontrado.');

    if (comment.authorId !== userId)
        throw new Error('No puedes editar este comentario.');

    comment.content = updateData.content ?? comment.content;

    await comment.save();
    return comment;
};


export const deleteCommentById = async ({ commentId, userId }) => {
    const comment = await Comment.findById(commentId);

    if (!comment) throw new Error('Comentario no encontrado.');

    if (comment.authorId !== userId)
        throw new Error('No puedes eliminar este comentario.');

    await comment.deleteOne();
    return true;
};