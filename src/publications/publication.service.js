'use strict';

import Post from './publication.model.js';


/* CREAR PUBLICACIÓN */
export const createPostRecord = async ({ postData }) => {
    const data = { ...postData };

    const post = new Post(data);
    await post.save();

    return post;
};


/* OBTENER TODAS LAS PUBLICACIONES */
export const getAllPosts = async () => {
    return await Post.find().sort({ createdAt: -1 });
};


/* OBTENER PUBLICACIONES DE UN USUARIO */
export const getPostsByUser = async (userId) => {
    return await Post.find({ authorId: userId }).sort({ createdAt: -1 });
};


/* EDITAR PUBLICACIÓN (solo dueño) */
export const updatePostById = async ({ postId, userId, updateData }) => {
    const post = await Post.findById(postId);

    if (!post) throw new Error('Publicación no encontrada.');

    if (post.authorId !== userId)
        throw new Error('No tienes permiso para editar esta publicación.');

    Object.assign(post, updateData);
    await post.save();

    return post;
};


/* ELIMINAR PUBLICACIÓN (solo dueño) */
export const deletePostById = async ({ postId, userId }) => {
    const post = await Post.findById(postId);

    if (!post) throw new Error('Publicación no encontrada.');

    if (post.authorId !== userId)
        throw new Error('No tienes permiso para eliminar esta publicación.');

    await post.deleteOne();

    return true;
};