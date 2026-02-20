'use strict';

import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const userSchema = new Schema(
    {
        _id: {
            type: String,
            default: uuidv4
        },

        username: {
            type: String,
            required: [true, 'El nombre de usuario es requerido.'],
            unique: true,
            trim: true,
            minLength: [4, 'El username debe tener al menos 4 caracteres.'],
            maxLength: [25, 'El username no puede exceder 25 caracteres.']
        },

        email: {
            type: String,
            required: [true, 'El correo es requerido.'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Correo no válido.']
        },

        password: {
            type: String,
            required: [true, 'La contraseña es requerida.'],
            minLength: [6, 'La contraseña debe tener al menos 6 caracteres.']
        },

        bio: {
            type: String,
            maxLength: [250, 'La biografía no puede exceder 250 caracteres.'],
            default: ''
        },

        status: {
            type: String,
            enum: {
                values: ['ACTIVO', 'BLOQUEADO'],
                message: 'Estado no válido.'
            },
            default: 'ACTIVO'
        }
    },
    {
        _id: false,
        timestamps: true,
        versionKey: false
    }
);

userSchema.index({ username: 1 });
userSchema.index({ email: 1 });
userSchema.index({ status: 1 });

export default model('User', userSchema);
