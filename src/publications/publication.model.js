'use strict';

import { Schema, model } from 'mongoose';

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'El título es requerido.'],
            maxLength: [120, 'El título no puede exceder 120 caracteres.']
        },

        category: {
            type: String,
            required: [true, 'La categoría es requerida.'],
            enum: {
                values: ['TECNOLOGIA', 'EDUCACION', 'OPINION', 'NOTICIA', 'OTRO'],
                message: 'Categoría no válida.'
            }
        },

        content: {
            type: String,
            required: [true, 'El contenido es requerido.']
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

postSchema.index({ category: 1 });
postSchema.index({ createdAt: -1 });

export default model('Post', postSchema);