'use strict';

import { Schema, model } from 'mongoose';

const commentSchema = new Schema(
    {
        content: {
            type: String,
            required: [true, 'El comentario no puede estar vacío.'],
            maxLength: [500, 'El comentario no puede exceder 500 caracteres.']
        },

        postId: {
            type: Schema.Types.ObjectId,
            ref: 'Post',
            required: true,
            index: true
        },

        authorId: {
            type: String, // UUID del usuario
            required: true,
            index: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

commentSchema.index({ postId: 1, createdAt: -1 });

export default model('Comment', commentSchema);