'use strict';

import User from './user.model.js';
import jwt from 'jsonwebtoken';


export const createUserRecord = async ({ userData }) => {
    const data = { ...userData };

    const exists = await User.findOne({
        $or: [{ username: data.username }, { email: data.email }]
    });

    if (exists) {
        throw new Error('El usuario o correo ya está registrado.');
    }

    const user = new User(data);
    await user.save();

    return user;
};


export const loginUser = async (identifier, password) => {
    const user = await User.findOne({
        $or: [{ username: identifier }, { email: identifier }]
    });

    if (!user) throw new Error('Usuario no encontrado.');

    if (user.status !== 'ACTIVO')
        throw new Error('Usuario bloqueado.');

    if (user.password !== password)
        throw new Error('Contraseña incorrecta.');

    const token = jwt.sign(
        {
            sub: user._id,
            role: 'USER_ROLE'
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h',
            issuer: process.env.JWT_ISSUER,
            audience: process.env.JWT_AUDIENCE
        }
    );

    return {
        token,
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    };
};


export const getUserById = async (userId) => {
    const user = await User.findById(userId).select('-password');

    if (!user) throw new Error('Usuario no encontrado.');

    return user;
};


export const updateUserProfile = async ({ userId, updateData }) => {
    const data = { ...updateData };

    const user = await User.findById(userId);
    if (!user) throw new Error('Usuario no encontrado.');

    if (data.newPassword) {
        if (!data.currentPassword)
            throw new Error('Debe ingresar la contraseña actual.');

        if (data.currentPassword !== user.password)
            throw new Error('La contraseña actual no coincide.');

        user.password = data.newPassword;
    }

    if (data.username) user.username = data.username;
    if (data.email) user.email = data.email;
    if (data.bio !== undefined) user.bio = data.bio;
    if (data.profileImage !== undefined) user.profileImage = data.profileImage;

    await user.save();

    return user;
};
